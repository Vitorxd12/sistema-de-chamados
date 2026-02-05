package com.chamados.backend.controller;

import com.chamados.backend.dto.ComentarioDTO;
import com.chamados.backend.model.Usuario;
import com.chamados.backend.service.ComentarioService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/comentarios")
public class ComentarioController {

    private ComentarioService comentarioService;

    @GetMapping("/{id}")
    public ResponseEntity<List<ComentarioDTO.Response>> comentariosDoChamado(@PathVariable Long id) {
        List<ComentarioDTO.Response> comentarios = comentarioService.comentariosDoChamado(id);
        return ResponseEntity.ok(comentarios);
    }

    @PostMapping
    public ResponseEntity<ComentarioDTO.Response> adicionarComentario(@RequestBody ComentarioDTO.Create comentario, @AuthenticationPrincipal Usuario usuario) {
        ComentarioDTO.Response novoComentario = comentarioService.adicionarComentario(comentario, usuario);
        return ResponseEntity.status(201).body(novoComentario);
    }
}
