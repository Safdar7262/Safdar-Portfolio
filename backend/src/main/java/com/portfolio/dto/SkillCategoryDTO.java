package com.portfolio.dto;

import lombok.*;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class SkillCategoryDTO {
    private Long id;
    private String name, icon, color;
    private List<SkillDTO> skills;
}
