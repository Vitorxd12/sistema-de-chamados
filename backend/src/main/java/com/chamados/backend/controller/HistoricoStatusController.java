package com.chamados.backend.controller;

import com.chamados.backend.service.HistoricoStatusService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/historico-status")
public class HistoricoStatusController {

    @Autowired
    private HistoricoStatusService historicoStatusService;
}
