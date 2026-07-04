package com.portfolio.controller;

import com.portfolio.dto.*;
import com.portfolio.model.*;
import com.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProfileRepository profileRepo;
    private final ProjectRepository projectRepo;
    private final ExperienceRepository experienceRepo;
    private final SkillCategoryRepository skillCatRepo;
    private final ContactMessageRepository contactRepo;

    // ── PROFILE ──
    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id,
                                           @RequestBody Profile body) {
        return profileRepo.findById(id).map(p -> {
            p.setFullName(body.getFullName());
            p.setRole(body.getRole());
            p.setBio(body.getBio());
            p.setEmail(body.getEmail());
            p.setPhone(body.getPhone());
            p.setLocation(body.getLocation());
            p.setGithubUrl(body.getGithubUrl());
            p.setLinkedinUrl(body.getLinkedinUrl());
            p.setTwitterUrl(body.getTwitterUrl());
            p.setYearsExperience(body.getYearsExperience());
            p.setProjectsCount(body.getProjectsCount());
            p.setClientsCount(body.getClientsCount());
            p.setGithubStars(body.getGithubStars());
            p.setAvailableForWork(body.getAvailableForWork());
            p.setUpdatedAt(LocalDateTime.now());
            return ResponseEntity.ok(profileRepo.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ── PROJECTS ──
    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectRepo.findAllByOrderBySortOrderAsc());
    }

    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        project.setCreatedAt(LocalDateTime.now());
        return ResponseEntity.ok(projectRepo.save(project));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id,
                                           @RequestBody Project body) {
        return projectRepo.findById(id).map(p -> {
            p.setTitle(body.getTitle());
            p.setSubtitle(body.getSubtitle());
            p.setDescription(body.getDescription());
            p.setAccentColor(body.getAccentColor());
            p.setLiveUrl(body.getLiveUrl());
            p.setGithubUrl(body.getGithubUrl());
            p.setFeatured(body.getFeatured());
            return ResponseEntity.ok(projectRepo.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        projectRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Project deleted"));
    }

    // ── EXPERIENCE ──
    @PostMapping("/experience")
    public ResponseEntity<Experience> createExperience(@RequestBody Experience exp) {
        return ResponseEntity.ok(experienceRepo.save(exp));
    }

    @PutMapping("/experience/{id}")
    public ResponseEntity<?> updateExperience(@PathVariable Long id,
                                              @RequestBody Experience body) {
        return experienceRepo.findById(id).map(e -> {
            e.setRole(body.getRole());
            e.setCompany(body.getCompany());
            e.setEmploymentType(body.getEmploymentType());
            e.setDescription(body.getDescription());
            e.setIsCurrent(body.getIsCurrent());
            e.setPeriodStart(body.getPeriodStart());
            e.setPeriodEnd(body.getPeriodEnd());
            return ResponseEntity.ok(experienceRepo.save(e));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/experience/{id}")
    public ResponseEntity<?> deleteExperience(@PathVariable Long id) {
        experienceRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Experience deleted"));
    }

    // ── CONTACT MESSAGES ──
    @GetMapping("/messages")
    public ResponseEntity<List<ContactMessage>> getMessages() {
        return ResponseEntity.ok(contactRepo.findAll());
    }

    @PutMapping("/messages/{id}/read")
    public ResponseEntity<?> markRead(@PathVariable Long id) {
        return contactRepo.findById(id).map(m -> {
            m.setIsRead(true);
            return ResponseEntity.ok(contactRepo.save(m));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id) {
        contactRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Message deleted"));
    }
}