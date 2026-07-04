package com.portfolio.dto;

import lombok.*;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ProjectDTO {
    private Long id;
    private String title, subtitle, description, icon, accentColor;
    private String liveUrl, githubUrl, caseStudyUrl;
    private Boolean featured;
    private List<String> tags;
    private List<String> metrics;
}
