package com.chamados.backend.service;

import org.springframework.stereotype.Service;
@Service
public class HelpDeskService {
    public String helloName(String name) {
        return "Hello, "+ name;
    }
}
