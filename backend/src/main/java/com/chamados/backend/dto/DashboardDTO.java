package com.chamados.backend.dto;

import java.time.LocalDateTime;

public record DashboardDTO(
    Long totalChamados,
    Long chamadosAbertos,
    Long chamadosEmAndamento,
    Long chamadosResolvidos,
    Long chamadosFechados,
    String tempoMedioResolucao
) { }
