package com.portfolio.dto;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ProfileDTO {
    private Long id;
    private String fullName, role, tagline, bio, email, phone, location;
    private String githubUrl, linkedinUrl, twitterUrl, resumeUrl, avatarUrl;
    private Integer yearsExperience, projectsCount, clientsCount;
    private String githubStars;
    private Boolean availableForWork;
}
