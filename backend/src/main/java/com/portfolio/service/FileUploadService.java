package com.portfolio.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

@Slf4j
@Service
public class FileUploadService {

    @Value("${file.upload.dir:./uploads}")
    private String uploadDir;

    public String uploadResume(MultipartFile file) throws IOException {
        if (file.isEmpty()) throw new IllegalArgumentException("File is empty");

        String filename = file.getOriginalFilename();
        if (filename == null || !filename.toLowerCase().endsWith(".pdf")) {
            throw new IllegalArgumentException("Only PDF files allowed");
        }

        Path uploadPath = Paths.get(uploadDir, "resume");
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve("resume.pdf");
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        log.info("Resume uploaded successfully to: {}", filePath);
        return "/api/v1/resume/download";
    }
}