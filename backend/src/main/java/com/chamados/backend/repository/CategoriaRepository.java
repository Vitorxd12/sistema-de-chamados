package com.chamados.backend.repository;

import com.chamados.backend.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    // RF13: Listar apenas categorias ativas para o cliente escolher
    List<Categoria> findByAtivoTrue();
}