package com.chamados.backend.dto;

import java.time.LocalDateTime;

public class ChamadoDTO {
    public record Create(
            String titulo,
            String descricao,
            String prioridade,
            Long idUsuario,
            Long idCategoria
    ) {
    }

    public record Resumo(
            Long id,
            String titulo,
            String status,
            String prioridade,
            LocalDateTime dataCriacao,
            String nomeCliente
    ) {
    }

    public record Detalhado(
            Long id,
            String titulo,
            String status,
            String prioridade,
            LocalDateTime dataCriacao,
            String nomeCliente,
            String descricao,
            String nomeTecnico,
            String parecerTecnico,
            LocalDateTime dataFechamento
    ) {
    }

    public record ControleTecnico(
            String parecerTecnico,
            Long idTecnico,
            Long idChamado
    ) {
    }

}
