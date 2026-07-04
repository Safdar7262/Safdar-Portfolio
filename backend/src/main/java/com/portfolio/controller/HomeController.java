package com.portfolio.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Portfolio Backend is Running Successfully 🚀";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
