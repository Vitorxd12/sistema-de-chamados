package com.chamados.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "chamados")
@Getter
@Setter
public class Chamado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String titulo;
    private String descricao;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ABERTO;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Usuario cliente;

    @ManyToOne
    @JoinColumn(name = "id_tecnico")
    private Usuario tecnico;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    private String solucao;

    @CreationTimestamp
    private LocalDateTime dataCriacao;
}
