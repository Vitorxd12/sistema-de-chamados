package com.chamados.backend.service;

import com.chamados.backend.model.*;
import com.chamados.backend.repository.CategoriaRepository;
import com.chamados.backend.repository.ChamadoRepository;
import com.chamados.backend.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class ChamadoService {

    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;
    private final ChamadoRepository chamadoRepository;
    private final HistoricoStatusService historicoStatusService;

    public void criarChamado(String titulo, String descricao, String prioridade, Long idUsuario, Long idCategoria) {

        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        Categoria categoria = categoriaRepository.findById(idCategoria)
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada"));

        prioridade = prioridade.toUpperCase();
        boolean prioridadeValida = prioridade.equals("BAIXA") || prioridade.equals("MEDIA") || prioridade.equals("ALTA") || prioridade.equals("URGENTE");
        if(!prioridadeValida) {
            throw new EntityNotFoundException("Prioridade inválida");
        }

        Chamado chamado = new Chamado();
        chamado.setTitulo(titulo);
        chamado.setDescricao(descricao);
        chamado.setPrioridade(Prioridade.valueOf(prioridade));
        chamado.setCliente(usuario);
        chamado.setCategoria(categoria);
        chamado.setStatus(Status.ABERTO);

        chamadoRepository.save(chamado);
    }

    @Transactional
    public void assumirChamado(Long idChamado, Long idTecnico) {
        Chamado chamado = chamadoRepository.findById(idChamado)
                .orElseThrow(() -> new EntityNotFoundException("Chamado não encontrado"));

        Usuario tecnico = usuarioRepository.findById(idTecnico)
                .orElseThrow(() -> new EntityNotFoundException("Técnico não encontrado"));

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
    }

    @Transactional
    public void resolverChamado(Long idChamado, String parecerTecnico, Long idTecnico) {
        Chamado chamado = chamadoRepository.findById(idChamado)
                .orElseThrow(() -> new EntityNotFoundException("Chamado não encontrado"));

        Usuario tecnico = usuarioRepository.findById(idTecnico)
                .orElseThrow(() -> new EntityNotFoundException("Técnico não encontrado"));

        if(tecnico.getPerfil().equals(Perfil.USER)){
            throw new RuntimeException("Usuário não é um técnico");
        }

        Status statusAnterior = chamado.getStatus();
        chamado.setStatus(Status.RESOLVIDO);
        chamado.setDataFechamento(LocalDateTime.now());
        chamado.setParecerTecnico(parecerTecnico + " (Fechado pelo técnico: " + tecnico.getNome() + ")");

        chamadoRepository.save(chamado);
        historicoStatusService.registrarMudancaStatus(chamado, statusAnterior, Status.RESOLVIDO);
    }
}