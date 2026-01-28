package com.chamados.backend.service;

import com.chamados.backend.dto.ComentarioDTO;
import com.chamados.backend.model.Chamado;
import com.chamados.backend.model.Comentario;
import com.chamados.backend.model.Status;
import com.chamados.backend.model.Usuario;
import com.chamados.backend.repository.ChamadoRepository;
import com.chamados.backend.repository.ComentarioRepository;
import com.chamados.backend.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ComentarioService {

    private final ComentarioRepository comentarioRepository;
    private final ChamadoRepository chamadoRepository;
    private final UsuarioRepository usuarioRepository;


    public ComentarioDTO.Response adicionarComentario(ComentarioDTO.Create dto) {
        Chamado chamado = chamadoRepository.findById(dto.chamadoId())
                .orElseThrow(() -> new EntityNotFoundException("Chamado não encontrado"));
        Usuario usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        boolean isCliente = usuario.getId().equals(chamado.getCliente().getId());
        boolean isTecnico = chamado.getTecnico() != null && usuario.getId().equals(chamado.getTecnico().getId());

        if (!isCliente && !isTecnico) {
            throw new RuntimeException("Usuário não está autorizado a comentar neste chamado");
        }
        if(chamado.getStatus().equals(Status.FECHADO)) {
            throw new RuntimeException("Comentários não podem ser adicionados a chamados fechados");
        }
        Comentario comentario = new Comentario();
        comentario.setUsuario(usuario);
        comentario.setChamado(chamado);
        comentario.setTexto(dto.texto());

        comentarioRepository.save(comentario);

        return new ComentarioDTO.Response(
                comentario.getId(),
                chamado.getId(),
                usuario.getId(),
                usuario.getNome(),
                comentario.getTexto(),
                comentario.getDataEnvio()
        );
    }
    public List<ComentarioDTO.Response> comentariosDoChamado(long chamadoId) {
        Chamado chamado = chamadoRepository.findById(chamadoId)
                .orElseThrow(() -> new EntityNotFoundException("Chamado não encontrado"));
        List<Comentario> lista = comentarioRepository.findByChamadoIdOrderByDataEnvioAsc(chamado.getId());

        return lista.stream()
                .map(c -> new ComentarioDTO.Response(
                        c.getId(),
                        c.getChamado().getId(),
                        c.getUsuario().getId(),
                        c.getUsuario().getNome(),
                        c.getTexto(),
                        c.getDataEnvio()
                ))
                .toList();
    }


    }

