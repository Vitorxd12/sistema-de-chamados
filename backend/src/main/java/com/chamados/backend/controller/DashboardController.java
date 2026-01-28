package com.chamados.backend.controller;

import com.chamados.backend.dto.DashboardDTO;
import com.chamados.backend.service.DashboardService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/dashboard")
public class DashboardController {

    private DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardDTO> obterDadosDashboard() {
        DashboardDTO dadosDashboard = dashboardService.obterDadosDashboard();
        return ResponseEntity.ok(dadosDashboard);
    }

}
