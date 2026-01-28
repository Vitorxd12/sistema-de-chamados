package com.chamados.backend.controller;

import com.chamados.backend.dto.HistoricoStatusDTO;
import com.chamados.backend.service.HistoricoStatusService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/historico-status")
public class HistoricoStatusController {

    private HistoricoStatusService historicoStatusService;

    @GetMapping("/{id}")
    public ResponseEntity<List<HistoricoStatusDTO>> obterHistoricoStatusChamado(@PathVariable Long id) {
        List<HistoricoStatusDTO> historicoStatusDTO = historicoStatusService.obterHistoricoStatusChamado(id);
        return ResponseEntity.ok(historicoStatusDTO);
    }
}
