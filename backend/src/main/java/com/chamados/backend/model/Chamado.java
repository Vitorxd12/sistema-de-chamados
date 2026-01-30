package com.chamados.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
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
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Prioridade prioridade = Prioridade.BAIXA;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status = Status.ABERTO;

    private String parecerTecnico;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime dataCriacao;

    private LocalDateTime dataFechamento;

    //Foreign Keys

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Usuario cliente;

    @ManyToOne
    @JoinColumn(name = "id_tecnico")
    private Usuario tecnico;

    private Categoria categoria;
}
