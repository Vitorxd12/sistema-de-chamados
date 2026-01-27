package com.chamados.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String Email;

    @Column(nullable = false)
    private String Senha;

    @Enumerated(EnumType.STRING)
    private Perfil perfil;

    private boolean ativo;
}
