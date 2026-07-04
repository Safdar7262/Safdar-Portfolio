package com.portfolio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "experience_tag")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "experience_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Experience experience;

    private String tag;
}
