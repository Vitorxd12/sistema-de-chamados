package com.chamados.backend.service;

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

@Service
@AllArgsConstructor
public class ComentarioService {

    private final ComentarioRepository comentarioRepository;
    private final ChamadoRepository chamadoRepository;
    private final UsuarioRepository usuarioRepository;


    public void adicionarComentario(Long usuarioId, Long chamadoId, String texto) {
        Chamado chamado = chamadoRepository.findById(chamadoId)
                .orElseThrow(() -> new EntityNotFoundException("Chamado não encontrado"));
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        if(chamado.getTecnico().getPerfil() != usuario.getPerfil() || chamado.getCliente().getPerfil() != usuario.getPerfil()) {
            throw new RuntimeException("Usuário não está autorizado a comentar neste chamado");
        }

        if(chamado.getStatus().equals(Status.FECHADO)) {
            throw new RuntimeException("Comentários não podem ser adicionados a chamados fechados");
        }
        Comentario comentario = new Comentario();
        comentario.setUsuario(usuario);
        comentario.setChamado(chamado);
        comentario.setTexto(texto);

        comentarioRepository.save(comentario);

    }
}
