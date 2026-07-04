package com.portfolio.controller;

import com.portfolio.dto.*;
import com.portfolio.model.ViewCounter;
import com.portfolio.service.PortfolioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService service;
    private final com.portfolio.repository.ViewCounterRepository viewRepo;

    @GetMapping("/profile")
    public ResponseEntity<ProfileDTO> getProfile() {
        return ResponseEntity.ok(service.getProfile());
    }

    @GetMapping("/skills")
    public ResponseEntity<List<SkillCategoryDTO>> getSkills() {
        return ResponseEntity.ok(service.getSkills());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDTO>> getProjects(
            @RequestParam(defaultValue = "false") boolean featured) {
        return ResponseEntity.ok(service.getProjects(featured));
    }

    @GetMapping("/experience")
    public ResponseEntity<List<ExperienceDTO>> getExperience() {
        return ResponseEntity.ok(service.getExperience());
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> sendMessage(
            @Valid @RequestBody ContactRequest req) {
        service.saveContactMessage(req);
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Thank you! Your message has been received."
        ));

    }
    // GET /api/v1/views — get current count
    @GetMapping("/views")
    public ResponseEntity<?> getViews() {
        return viewRepo.findById(1L)
                .map(v -> ResponseEntity.ok(java.util.Map.of("count", v.getCount())))
                .orElse(ResponseEntity.ok(java.util.Map.of("count", 0L)));
    }

    // POST /api/v1/views/increment — increment count
    @PostMapping("/views/increment")
    public ResponseEntity<?> incrementViews() {
        ViewCounter vc = viewRepo.findById(1L)
                .orElse(ViewCounter.builder().id(1L).count(0L).build());
        vc.setCount(vc.getCount() + 1);
        vc.setLastViewed(java.time.LocalDateTime.now());
        viewRepo.save(vc);
        return ResponseEntity.ok(java.util.Map.of("count", vc.getCount()));
    }
}
