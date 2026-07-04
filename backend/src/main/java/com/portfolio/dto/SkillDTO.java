package com.portfolio.dto;

import lombok.*;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class SkillDTO {
    private Long id;
    private String name;
    private Integer proficiency;
}
