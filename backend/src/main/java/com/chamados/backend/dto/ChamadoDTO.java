package com.chamados.backend.dto;

import com.chamados.backend.model.Categoria;
import com.chamados.backend.model.Prioridade;
import com.chamados.backend.model.Status;

import java.time.LocalDateTime;
import java.util.List;

public class ChamadoDTO {
    public record Create(
            String titulo,
            String descricao,
            Prioridade prioridade,
            Categoria categoria
    ) {
    }

    public record Resumo(
            Long id,
            String titulo,
            Status status,
            Prioridade prioridade,
            LocalDateTime dataCriacao,
            String nomeCliente
    ) {
    }

    public record Detalhado(
            Long id,
            String titulo,
            Status status,
            Prioridade prioridade,
            LocalDateTime dataCriacao,
            Categoria categoria,
            String nomeCliente,
            String descricao,
            String nomeTecnico,
            String parecerTecnico,
            LocalDateTime dataFechamento
    ) {
    }

    public record Concluir(
            String parecerTecnico,
            Long idChamado
    ) {
    }

    public record Assumir(
            Long idChamado
    ) {
    }

    public record Lista(
        List<ChamadoDTO.Resumo> chamados
    ) {
    }
}
