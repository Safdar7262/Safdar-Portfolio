package com.portfolio.service;

import com.portfolio.dto.*;
import com.portfolio.model.*;
import com.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final ProfileRepository profileRepo;
    private final SkillCategoryRepository skillCatRepo;
    private final ProjectRepository projectRepo;
    private final ExperienceRepository experienceRepo;
    private final ContactMessageRepository contactRepo;
    private final EmailService emailService;

    public ProfileDTO getProfile() {
        Profile p = profileRepo.findTopByOrderByIdAsc()
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        return ProfileDTO.builder()
                .id(p.getId())
                .fullName(p.getFullName())
                .role(p.getRole())
                .tagline(p.getTagline())
                .bio(p.getBio())
                .email(p.getEmail())
                .phone(p.getPhone())
                .location(p.getLocation())
                .githubUrl(p.getGithubUrl())
                .linkedinUrl(p.getLinkedinUrl())
                .twitterUrl(p.getTwitterUrl())
                .resumeUrl(p.getResumeUrl())
                .avatarUrl(p.getAvatarUrl())
                .yearsExperience(p.getYearsExperience())
                .projectsCount(p.getProjectsCount())
                .clientsCount(p.getClientsCount())
                .githubStars(p.getGithubStars())
                .availableForWork(p.getAvailableForWork())
                .build();
    }

    public List<SkillCategoryDTO> getSkills() {
        return skillCatRepo.findAllByOrderBySortOrderAsc().stream()
                .map(cat -> SkillCategoryDTO.builder()
                        .id(cat.getId())
                        .name(cat.getName())
                        .icon(cat.getIcon())
                        .color(cat.getColor())
                        .skills(cat.getSkills().stream()
                                .map(s -> SkillDTO.builder()
                                        .id(s.getId())
                                        .name(s.getName())
                                        .proficiency(s.getProficiency())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }

    public List<ProjectDTO> getProjects(boolean featuredOnly) {
        List<Project> projects = featuredOnly
                ? projectRepo.findByFeaturedTrueOrderBySortOrderAsc()
                : projectRepo.findAllByOrderBySortOrderAsc();

        return projects.stream().map(p -> ProjectDTO.builder()
                .id(p.getId())
                .title(p.getTitle())
                .subtitle(p.getSubtitle())
                .description(p.getDescription())
                .icon(p.getIcon())
                .accentColor(p.getAccentColor())
                .liveUrl(p.getLiveUrl())
                .githubUrl(p.getGithubUrl())
                .caseStudyUrl(p.getCaseStudyUrl())
                .featured(p.getFeatured())
                .tags(p.getTags().stream()
                        .map(ProjectTag::getTag)
                        .collect(Collectors.toList()))
                .metrics(p.getMetrics().stream()
                        .map(ProjectMetric::getMetric)
                        .collect(Collectors.toList()))
                .build())
                .collect(Collectors.toList());
    }

    public List<ExperienceDTO> getExperience() {
        return experienceRepo.findAllByOrderBySortOrderAsc().stream()
                .map(e -> ExperienceDTO.builder()
                        .id(e.getId())
                        .role(e.getRole())
                        .company(e.getCompany())
                        .employmentType(e.getEmploymentType())
                        .description(e.getDescription())
                        .periodStart(e.getPeriodStart())
                        .periodEnd(e.getPeriodEnd())
                        .isCurrent(e.getIsCurrent())
                        .tags(e.getTags().stream()
                                .map(ExperienceTag::getTag)
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }

    public void saveContactMessage(ContactRequest req) {
        // contactRepo.save(ContactMessage.builder()
        //         .name(req.getName())
        //         .email(req.getEmail())
        //         .subject(req.getSubject())
        //         .message(req.getMessage())
        //         .isRead(false)
        //         .createdAt(LocalDateTime.now())
        //         .build());

        // Send email notification asynchronously
        emailService.sendContactNotification(
                req.getName(),
                req.getEmail(),
                req.getSubject(),
                req.getMessage()
        );
    }
}
