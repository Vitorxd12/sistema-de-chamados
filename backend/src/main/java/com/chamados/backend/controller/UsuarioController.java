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

    private final UsuarioService usuarioService;

    @PostMapping() // Criação de usuário
    public ResponseEntity<UsuarioDTO.Response> createUsuario(@RequestBody @Valid UsuarioDTO.Create usuario) {
        UsuarioDTO.Response novoUsuario = usuarioService.criarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }

    @GetMapping("/{id}") // Obter usuário por ID
    public ResponseEntity<UsuarioDTO.Response> getUsuarioById(@PathVariable Long id) {
        UsuarioDTO.Response usuario = usuarioService.obterUsuarioPorId(id);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping() // Listar todos os usuários
    public ResponseEntity<List<UsuarioDTO.Response>> listarUsuarios() {
        List<UsuarioDTO.Response> usuarios = usuarioService.listarUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @PatchMapping("/desativar/{id}") // Desativar usuário
    public ResponseEntity<String> desativarUsuario(@PathVariable Long id) {
        usuarioService.desativarUsuario(id);
        return ResponseEntity.status(HttpStatus.OK).body("Usuário desativado com sucesso.");
    }
}
