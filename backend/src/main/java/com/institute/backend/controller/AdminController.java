package com.institute.backend.controller;

import com.institute.backend.dto.response.ApiResponse;
import com.institute.backend.entity.User;
import com.institute.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;

    @GetMapping("/students")
    public ResponseEntity<ApiResponse<List<User>>> getAllStudents() {
        List<User> students = userRepository.findAll();
        // Remove passwords from response
        students.forEach(s -> s.setPassword(null));
        return ResponseEntity.ok(ApiResponse.success("Students fetched successfully", students));
    }
}
