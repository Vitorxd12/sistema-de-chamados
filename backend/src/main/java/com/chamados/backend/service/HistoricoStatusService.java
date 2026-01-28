package com.chamados.backend.service;

import com.chamados.backend.model.Chamado;
import com.chamados.backend.model.HistoricoStatus;
import com.chamados.backend.model.Status;
import com.chamados.backend.repository.HistoricoStatusRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
}
