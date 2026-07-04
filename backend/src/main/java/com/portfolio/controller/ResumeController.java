package com.portfolio.controller;

import com.portfolio.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ResumeController {

    private final FileUploadService fileUploadService;

    @Value("${file.upload.dir:./uploads}")
    private String uploadDir;

    // POST /api/v1/admin/resume — upload resume (protected)
    @PostMapping("/admin/resume")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            String url = fileUploadService.uploadResume(file);
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Resume uploaded successfully!",
                    "url", url
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }
    }

    // GET /api/v1/resume/download — download resume (public)
    @GetMapping("/resume/download")
    public ResponseEntity<Resource> downloadResume() {
        try {
            Path filePath = Paths.get(uploadDir, "resume", "resume.pdf");
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"Aryan_Raj_Resume.pdf\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // GET /api/v1/resume/exists — check if resume exists
    @GetMapping("/resume/exists")
    public ResponseEntity<?> resumeExists() {
        Path filePath = Paths.get(uploadDir, "resume", "resume.pdf");
        return ResponseEntity.ok(Map.of(
                "exists", filePath.toFile().exists(),
                "url", "/api/v1/resume/download"
        ));
    }
}