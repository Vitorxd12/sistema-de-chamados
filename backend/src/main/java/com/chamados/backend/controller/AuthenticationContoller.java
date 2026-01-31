package com.chamados.backend.controller;

import com.chamados.backend.configuration.secuity.TokenService;
import com.chamados.backend.dto.AuthenticationDTO;
import com.chamados.backend.dto.UsuarioDTO;
import com.chamados.backend.model.Usuario;
import com.chamados.backend.repository.UsuarioRepository;
import com.chamados.backend.service.AuthorizationService;
import com.chamados.backend.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationContoller {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO dto){
         var usernamePassword = new UsernamePasswordAuthenticationToken(dto.email(), dto.senha());
         var auth = this.authenticationManager.authenticate(usernamePassword);
         var token = tokenService.generateToken((Usuario) auth.getPrincipal());
         return ResponseEntity.ok(new UsuarioDTO.Login(token));
    }


    @PostMapping("/register") // Criação de usuário
    public ResponseEntity<UsuarioDTO.Response> createUsuario(@RequestBody @Valid UsuarioDTO.Create usuario) {
        UsuarioDTO.Response novoUsuario = usuarioService.criarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }
}
