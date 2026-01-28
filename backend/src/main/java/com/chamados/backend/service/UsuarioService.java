package com.chamados.backend.service;

import com.chamados.backend.model.Perfil;
import com.chamados.backend.model.Usuario;
import com.chamados.backend.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.EnumType;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public void criarUsuario(String nome, String email, String senha, String perfilString) {
        if (usuarioRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado");
        }
        Perfil perfil = Perfil.valueOf(perfilString);

        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(senha);
        usuario.setPerfil(perfil);
        usuario.setAtivo(true);
        usuarioRepository.save(usuario);
    }
    public void desativarUsuario(Long id){
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
        usuario.setAtivo(false);
        usuarioRepository.save(usuario);
    }
}
