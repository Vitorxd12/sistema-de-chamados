package com.chamados.backend.repository;

import com.chamados.backend.model.Chamado;
import com.chamados.backend.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChamadoRepository extends JpaRepository<Chamado, Long> {

    // RF02: Visualização apenas dos próprios chamados (Cliente)
    List<Chamado> findByClienteIdOrderByDataCriacaoDesc(Long clienteId);

    // RF06: Visualização da fila global por status (Técnico)
    List<Chamado> findByStatus(Status status);

    // RF12: Contagem para o Dashboard
    long countByStatus(Status status);

    // Busca chamados vinculados a um técnico específico
    List<Chamado> findByTecnicoId(Long tecnicoId);
}