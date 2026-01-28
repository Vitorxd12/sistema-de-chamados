package com.chamados.backend.service;

import com.chamados.backend.dto.UsuarioDTO;
import com.chamados.backend.model.Perfil;
import com.chamados.backend.model.Usuario;
import com.chamados.backend.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.EnumType;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioDTO.Create criarUsuario(UsuarioDTO.Create dto) {
        if (usuarioRepository.findByEmail(dto.email()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado");
        }
        Perfil perfil = Perfil.valueOf(dto.perfil());

        Usuario usuario = new Usuario();
        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setSenha(dto.senha());
        usuario.setPerfil(perfil);
        usuario.setAtivo(true);
        usuarioRepository.save(usuario);

        return dto;
    }
    public List<UsuarioDTO.Response> listarUsuarios() { // Alterado para List
        return usuarioRepository.findAll().stream()
                .map(u -> new UsuarioDTO.Response(
                        u.getId(),
                        u.getNome(),
                        u.getEmail(),
                        u.getPerfil().name(),
                        u.isAtivo()
                ))
                .toList();
    }

    public void desativarUsuario(Long id){
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
        usuario.setAtivo(false);
        usuarioRepository.save(usuario);
    }
}
