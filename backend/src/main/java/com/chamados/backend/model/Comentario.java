package com.chamados.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "comentarios")
public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String texto;

    @CreationTimestamp
    private LocalDateTime dataEnvio;

    @ManyToOne
    @JoinColumn(name = "id_chamado")
    private Chamado chamado;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

}
