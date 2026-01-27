package com.chamados.backend.repository;

import com.chamados.backend.model.HistoricoStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoricoStatusRepository extends JpaRepository<HistoricoStatus, Long> {
    
    // Busca o histórico de status de um chamado específico em ordem decrescente de data
    List<HistoricoStatus> findByChamadoIdOrderByDataAlteracaoDesc(Long chamadoId);
}
