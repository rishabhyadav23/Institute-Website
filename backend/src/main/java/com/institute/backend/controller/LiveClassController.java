package com.institute.backend.controller;

import com.institute.backend.dto.response.ApiResponse;
import com.institute.backend.entity.LiveClass;
import com.institute.backend.entity.User;
import com.institute.backend.exception.ResourceNotFoundException;
import com.institute.backend.repository.LiveClassRepository;
import com.institute.backend.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/live")
@RequiredArgsConstructor
public class LiveClassController {

    private final LiveClassRepository liveClassRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<LiveClass>>> getAll(
            @RequestParam(required = false) Boolean upcoming) {

        List<LiveClass> classes;

        if (Boolean.TRUE.equals(upcoming)) {
            classes = liveClassRepository.findByScheduledAtAfterOrderByScheduledAtAsc(LocalDateTime.now());
        } else {
            classes = liveClassRepository.findAll();
        }

        return ResponseEntity.ok(ApiResponse.success("Live classes fetched successfully", classes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LiveClass>> getById(@PathVariable Long id) {
        LiveClass liveClass = liveClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Live class not found with id: " + id));

        return ResponseEntity.ok(ApiResponse.success("Live class fetched successfully", liveClass));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LiveClass>> create(
            @Valid @RequestBody LiveClass liveClass, Principal principal) {

        User instructor = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        liveClass.setInstructor(instructor);
        LiveClass saved = liveClassRepository.save(liveClass);

        return ResponseEntity.ok(ApiResponse.success("Live class created successfully", saved));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<LiveClass>> updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            Principal principal) {

        LiveClass liveClass = liveClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Live class not found with id: " + id));

        liveClass.setStatus(LiveClass.Status.valueOf(status.toUpperCase()));
        liveClassRepository.save(liveClass);

        return ResponseEntity.ok(ApiResponse.success("Live class status updated successfully", liveClass));
    }
}
