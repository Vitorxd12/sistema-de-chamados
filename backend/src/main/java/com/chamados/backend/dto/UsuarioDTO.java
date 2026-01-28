package com.chamados.backend.dto;

public class UsuarioDTO {
    public record Create(
        String nome,
        String email,
        String senha,
        String perfil
    ){}
    public record Response(
        Long id,
        String nome,
        String email,
        String perfil,
        boolean ativo
    ){}
}
