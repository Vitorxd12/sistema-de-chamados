package com.chamados.backend.controller;

import com.chamados.backend.dto.ChamadoDTO;
import com.chamados.backend.service.ChamadoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/chamados")
public class ChamadoController {

    private ChamadoService chamadoService;

    @PostMapping // Criação de chamado
    public ResponseEntity<ChamadoDTO.Create> createChamado(@RequestBody @Valid ChamadoDTO.Create chamado) {
        ChamadoDTO.Create novoChamado = chamadoService.criarChamado(chamado);

        return ResponseEntity.status(HttpStatus.CREATED).body(novoChamado);
    }

    @PatchMapping("/assumir")
    public ResponseEntity<ChamadoDTO.Assumir> assumirChamado(@RequestBody @Valid ChamadoDTO.Assumir chamado) {
        chamadoService.assumirChamado(chamado);
        return ResponseEntity.status(HttpStatus.OK).body(chamado);
    }

    @PatchMapping("/resolver")
    public ResponseEntity<ChamadoDTO.Concluir> resolverChamado(@RequestBody @Valid ChamadoDTO.Concluir chamado) {
        ChamadoDTO.Concluir chamadoResolvido = chamadoService.resolverChamado(chamado);
        return ResponseEntity.ok(chamadoResolvido);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChamadoDTO.Detalhado> obterChamadoPorId(@PathVariable Long id) {
        ChamadoDTO.Detalhado chamado = chamadoService.obterChamadoPorId(id);
        return ResponseEntity.ok(chamado);
    }

    @GetMapping
    public ResponseEntity<Iterable<ChamadoDTO.Resumo>> listarChamados() {
        Iterable<ChamadoDTO.Resumo> chamados = chamadoService.listarChamados();
        return ResponseEntity.ok(chamados);
    }
}
