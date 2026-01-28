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
    private Status statusAnterior;

    @Enumerated(EnumType.STRING)
    private Status statusNovo;

    @CreationTimestamp
    private LocalDateTime dataAlteracao;

    @ManyToOne
    @JoinColumn(name = "obj_chamado")
    private Chamado chamado;


}
