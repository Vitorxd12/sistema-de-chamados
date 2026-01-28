package com.chamados.backend.service;

import com.chamados.backend.dto.ComentarioDTO;
import com.chamados.backend.dto.HistoricoStatusDTO;
import com.chamados.backend.model.Chamado;
import com.chamados.backend.model.HistoricoStatus;
import com.chamados.backend.model.Status;
import com.chamados.backend.repository.HistoricoStatusRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HistoricoStatusService {
    private final HistoricoStatusRepository historicoStatusRepository;

    public void registrarMudancaStatus(Chamado chamado, Status statusAnterior, Status statusNovo) {
        HistoricoStatus historicoStatus = new HistoricoStatus();
        historicoStatus.setChamado(chamado);
        historicoStatus.setStatusAnterior(statusAnterior);
        historicoStatus.setStatusNovo(statusNovo);
        historicoStatusRepository.save(historicoStatus);

    }

    public List<HistoricoStatusDTO> obterHistoricoStatusChamado(Long chamadoId) {
        List<HistoricoStatus> listaHistorico = historicoStatusRepository.findByChamadoIdOrderByDataAlteracaoDesc(chamadoId);
        return listaHistorico.stream()
                .map(c -> new HistoricoStatusDTO(
                        c.getId(),
                        c.getStatusNovo(),
                        c.getStatusAnterior(),
                        c.getDataAlteracao()
                ))
                .toList();
    }
}

