package com.chamados.backend.repository;

import com.chamados.backend.model.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {

    List<Comentario> findByChamadoIdOrderByDataEnvioAsc(Long chamadoId);

    List<Comentario> findTop5ByOrderByDataEnvioDesc();
}