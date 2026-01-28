package com.chamados.backend.dto;

import com.chamados.backend.model.Status;

import java.time.LocalDateTime;

public record HistoricoStatusDTO(
    Long id,
    Status statusAtual,
    Status statusAnterior,
    LocalDateTime dataHora

) {
}
