package com.chamados.backend.controller;

import com.chamados.backend.dto.UsuarioDTO;
import com.chamados.backend.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private UsuarioService usuarioService;

    @PostMapping("/create")
    public ResponseEntity<UsuarioDTO.Create> createUsuario(@RequestBody @Valid UsuarioDTO.Create usuario) {
        UsuarioDTO.Create novoUsuario = usuarioService.criarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }
    @PatchMapping("/desativar/{id}")
    public ResponseEntity<String> desativarUsuario(@PathVariable Long id) {
        usuarioService.desativarUsuario(id);
        return ResponseEntity.status(HttpStatus.OK).body("Usuário desativado com sucesso.");
    }

    @GetMapping("/listar")
    public ResponseEntity<List<UsuarioDTO.Response>> listarUsuarios() { // List aqui também
        List<UsuarioDTO.Response> usuarios = usuarioService.listarUsuarios();
        return ResponseEntity.ok(usuarios);
    }
}
