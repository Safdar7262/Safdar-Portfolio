package com.portfolio.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "profile")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String role;
    @Column(columnDefinition = "TEXT") private String tagline;
    @Column(columnDefinition = "TEXT") private String bio;
    private String email;
    private String phone;
    private String location;
    private String githubUrl;
    private String linkedinUrl;
    private String twitterUrl;
    private String resumeUrl;
    private String avatarUrl;
    private Integer yearsExperience;
    private Integer projectsCount;
    private Integer clientsCount;
    private String githubStars;
    private Boolean availableForWork;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
