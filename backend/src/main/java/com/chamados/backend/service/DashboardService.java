package com.chamados.backend.service;

import com.chamados.backend.dto.DashboardDTO;
import com.chamados.backend.model.Chamado;
import com.chamados.backend.model.Status;
import com.chamados.backend.repository.ChamadoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@AllArgsConstructor
public class DashboardService {

    private final ChamadoRepository chamadoRepository;

    public DashboardDTO obterDadosDashboard() {
        long total = chamadoRepository.count();
        long abertos = chamadoRepository.countByStatus(Status.ABERTO);
        long emAndamento = chamadoRepository.countByStatus(Status.EM_ANDAMENTO);
        long resolvidos = chamadoRepository.countByStatus(Status.RESOLVIDO);
        long fechados = chamadoRepository.countByStatus(Status.FECHADO);

        // 2. Cálculo do Tempo Médio de Resolução
        String tempoMedioFormatado = calcularTempoMedio(Status.RESOLVIDO);

        // 3. Retorno do DTO montado
        return new DashboardDTO(
                total,
                abertos,
                emAndamento,
                resolvidos,
                fechados,
                tempoMedioFormatado
        );
    }

    private String calcularTempoMedio(Status status) {
        // Busca todos os chamados que já foram finalizados
        List<Chamado> chamadosFinalizados = chamadoRepository.findByStatus(status);

        if (chamadosFinalizados.isEmpty()) {
            return "0h 0m";
        }

        // Calcula a soma total das durações
        long totalMinutos = chamadosFinalizados.stream()
                .filter(c -> c.getDataFechamento() != null) // Garantia extra contra null
                .mapToLong(c -> Duration.between(c.getDataCriacao(), c.getDataFechamento()).toMinutes())
                .sum();

        long mediaMinutos = totalMinutos / chamadosFinalizados.size();

        // Formatação simples para exibição (Ex: 5h 30m)
        long horas = mediaMinutos / 60;
        long minutosRestantes = mediaMinutos % 60;

        return String.format("%dh %dm", horas, minutosRestantes);
    }
}