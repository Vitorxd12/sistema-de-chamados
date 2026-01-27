package com.chamados.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "historico_status")
@Getter
@Setter
public class HistoricoStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Status status_anterior;

    @Enumerated(EnumType.STRING)
    private Status status_novo;

    @CreationTimestamp
    private LocalDateTime data_criacao;

    @ManyToOne
    @JoinColumn(name = "id_chamado")
    private Chamado chamado;


}
