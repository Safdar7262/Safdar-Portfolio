package com.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class ContactRequest {
    @NotBlank private String name;
    @Email    private String email;
    private String subject;
    @NotBlank private String message;
}
