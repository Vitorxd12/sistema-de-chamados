package com.chamados.backend.model;

public enum Perfil {
    USER("USER"),
    SUPPORT("SUPPORT"),
    ADMIN("ADMIN");

    private String role;

    Perfil(String role) {
        this.role = role;
    }

    public String getPeril() {
        return role;
    }
}
