package com.chamados.backend.dto;

import com.chamados.backend.model.Perfil;

public class UsuarioDTO {
    public record Create(
        String nome,
        String email,
        String senha,
        Perfil perfil
    ){}
    public record Login(
            String token
    ){}
    public record Response(
        Long id,
        String nome,
        String email,
        String perfil,
        boolean ativo
    ){}
}
