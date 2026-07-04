package com.portfolio.controller;

import com.portfolio.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        if (adminUsername.equals(username) && adminPassword.equals(password)) {
            String token = jwtService.generateToken(username);
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "username", username,
                    "message", "Login successful"
            ));
        }

        return ResponseEntity.status(401).body(Map.of(
                "error", "Invalid username or password"
        ));
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verify() {
        return ResponseEntity.ok(Map.of("status", "valid"));
    }
}