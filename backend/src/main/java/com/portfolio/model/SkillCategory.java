package com.portfolio.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "skill_category")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String icon;
    private String color;
    private Integer sortOrder;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("sortOrder ASC")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Skill> skills;
}
