package com.chamados.backend.controller;
import com.chamados.backend.service.HelpDeskService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// Controlador REST simples que responde a requisições HTTP
@RestController // Anotação que indica que esta classe é um controlador REST
@RequestMapping("/api") // Mapeia todas as requisições que começam com /api para este controlador
public class HelpDeskController {

    @Autowired // Conecta o serviço HelpDeskService ao controlador
    private HelpDeskService HelpDeskService;

    @GetMapping("/get") // Indica que este metodo responde a requisições GET e joga o endpoint para /api/hello
    // O metodo que retorna a saudação está em HelpDeskService
    public String hello() {
        return HelpDeskService.helloName("Virto");
    }


    @PostMapping("/post/{id}") // Indica que este metodo responde a requisições POST para /api, e espera um parametro de caminho {id}
    public String helpDeskPost(@PathVariable("id") String id, @RequestParam(value = "filter") String filter) { // Mapeia o parametro de caminho {id} para a variavel id, o parametro de consulta "filter" para a variavel filter, e o corpo da requisição para o objeto requestBody do tipo User
        return "Request recebido com sucesso: " + ", ID: " + id;
    }
}
