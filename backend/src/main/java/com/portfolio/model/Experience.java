package com.portfolio.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "experience")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String role;
    private String company;
    private String employmentType;
    private LocalDate periodStart;
    private LocalDate periodEnd;
    private Boolean isCurrent;
    @Column(columnDefinition = "TEXT") private String description;
    private Integer sortOrder;

    @OneToMany(mappedBy = "experience", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<ExperienceTag> tags;
}
