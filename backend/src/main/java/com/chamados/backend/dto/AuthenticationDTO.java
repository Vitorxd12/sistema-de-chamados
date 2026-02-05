package com.chamados.backend.dto;

public class AuthenticationDTO {
    public record Login(
            String email,
            String senha
    ) {
    }
    public record LoginResponse(
            String token
    ){}

}