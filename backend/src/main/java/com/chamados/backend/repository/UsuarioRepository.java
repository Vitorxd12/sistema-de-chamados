package com.chamados.backend.repository;

import com.chamados.backend.model.Perfil;
import com.chamados.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Busca por nome
    List<Usuario> findByNomeContainingIgnoreCase(String nome);

    List<Usuario> findAllByOrderByIdDesc();

    // Busca por e-mail para validar unicidade no cadastro
    UserDetails findByEmail(String email);

    // Busca por perfil (Cliente ou Técnico)
    List<Usuario> findByPerfil(Perfil perfil);
}
