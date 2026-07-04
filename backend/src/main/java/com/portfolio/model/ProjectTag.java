package com.portfolio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "project_tag")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Project project;

    private String tag;
}
