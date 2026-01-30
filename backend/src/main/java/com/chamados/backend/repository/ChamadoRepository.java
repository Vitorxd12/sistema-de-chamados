package com.chamados.backend.repository;

import com.chamados.backend.model.Chamado;
import com.chamados.backend.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChamadoRepository extends JpaRepository<Chamado, Long> {

    List<Chamado> findAllByOrderByDataCriacaoDesc();

    List<Chamado> findByClienteIdOrderByDataCriacaoDesc(Long clienteId);


    List<Chamado> findByStatus(Status status);


    long countByStatus(Status status);

    long count();


    List<Chamado> findByTecnicoId(Long tecnicoId);
}