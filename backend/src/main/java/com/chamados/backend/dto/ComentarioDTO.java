package com.chamados.backend.dto;

import java.time.LocalDateTime;

public class ComentarioDTO {
    public record Create(
        Long chamadoId,
        Long usuarioId,
        String texto
    ){}
    public record Response(
        Long id,
        Long chamadoId,
        Long usuarioId,
        String nomeUsuario,
        String texto,
        LocalDateTime dataEnvio
    ){}
}
