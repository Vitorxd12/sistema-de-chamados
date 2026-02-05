package com.chamados.backend.service;

import com.chamados.backend.dto.ChamadoDTO;
import com.chamados.backend.model.*;
import com.chamados.backend.repository.ChamadoRepository;
import com.chamados.backend.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ChamadoService {

    private final UsuarioRepository usuarioRepository;
    private final ChamadoRepository chamadoRepository;
    private final HistoricoStatusService historicoStatusService;

    public ChamadoDTO.Create criarChamado(ChamadoDTO.Create dto, Usuario usuario) {
        Chamado chamado = new Chamado();
        chamado.setTitulo(dto.titulo());
        chamado.setDescricao(dto.descricao());
        chamado.setPrioridade(Prioridade.valueOf(dto.prioridade().name()));
        chamado.setCliente(usuario);
        chamado.setCategoria(dto.categoria());
        chamado.setStatus(Status.ABERTO);

        chamadoRepository.save(chamado);
        return dto;
    }

    @Transactional
    public ChamadoDTO.Assumir assumirChamado(ChamadoDTO.Assumir dto, Usuario tecnico) {

        Chamado chamado = chamadoRepository.findById(dto.idChamado())
                .orElseThrow(() -> new EntityNotFoundException("Chamado não encontrado"));

        if(tecnico.getPerfil().equals(Perfil.USER)){
            throw new RuntimeException("Usuário não é um técnico");
        }

        if(!chamado.getStatus().equals(Status.ABERTO)){
            throw new RuntimeException("Chamado já está em atendimento ou fechado");
        }

        Status statusAnterior = chamado.getStatus();
        chamado.setTecnico(tecnico);
        chamado.setStatus(Status.EM_ANDAMENTO);

        chamadoRepository.save(chamado);
        historicoStatusService.registrarMudancaStatus(chamado, statusAnterior, Status.EM_ANDAMENTO);
        return dto;
    }

    @Transactional
    public ChamadoDTO.Concluir resolverChamado(ChamadoDTO.Concluir dto, Usuario tecnico) {
        Chamado chamado = chamadoRepository.findById(dto.idChamado())
                .orElseThrow(() -> new EntityNotFoundException("Chamado não encontrado"));

        if(tecnico.getPerfil().equals(Perfil.USER)){
            throw new RuntimeException("Usuário não é um técnico");
        }

        Status statusAnterior = chamado.getStatus();
        chamado.setStatus(Status.RESOLVIDO);
        chamado.setDataFechamento(LocalDateTime.now());
        chamado.setParecerTecnico(dto.parecerTecnico() + " (Fechado pelo técnico: " + tecnico.getNome() + ")");

        chamadoRepository.save(chamado);
        historicoStatusService.registrarMudancaStatus(chamado, statusAnterior, Status.RESOLVIDO);
        return dto;
    }

    public ChamadoDTO.Detalhado obterChamadoPorId(Long id) {
        Chamado chamado = chamadoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Chamado não encontrado"));

        return new ChamadoDTO.Detalhado(
                chamado.getId(),
                chamado.getTitulo(),
                chamado.getStatus(),
                chamado.getPrioridade(),
                chamado.getDataCriacao(),
                chamado.getCategoria(),
                chamado.getCliente().getNome(),
                chamado.getDescricao(),
                chamado.getTecnico() != null ? chamado.getTecnico().getNome() : null,
                chamado.getParecerTecnico(),
                chamado.getDataFechamento()
        );
    }

    public List<ChamadoDTO.Resumo> listarChamados() {
        List<Chamado> chamados = chamadoRepository.findAllByOrderByDataCriacaoDesc();
        return chamados.stream()
                .map(c -> new ChamadoDTO.Resumo(
                        c.getId(),
                        c.getTitulo(),
                        c.getStatus(),
                        c.getPrioridade(),
                        c.getDataCriacao(),
                        c.getCliente().getNome()
                ))
                .toList();
    }

}