package com.portfolio.dto;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ExperienceDTO {
    private Long id;
    private String role, company, employmentType, description;
    private LocalDate periodStart, periodEnd;
    private Boolean isCurrent;
    private List<String> tags;
}
