package com.institute.backend.controller;

import com.institute.backend.dto.response.ApiResponse;
import com.institute.backend.dto.response.DashboardStatsResponse;
import com.institute.backend.entity.User;
import com.institute.backend.repository.CourseRepository;
import com.institute.backend.repository.LiveClassRepository;
import com.institute.backend.repository.TestSeriesRepository;
import com.institute.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final TestSeriesRepository testSeriesRepository;
    private final LiveClassRepository liveClassRepository;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats() {
        DashboardStatsResponse stats = DashboardStatsResponse.builder()
                .totalStudents(userRepository.countByRole(User.Role.STUDENT))
                .totalCourses(courseRepository.count())
                .totalTests(testSeriesRepository.count())
                .totalLiveClasses(liveClassRepository.count())
                .build();

        return ResponseEntity.ok(ApiResponse.success("Dashboard stats fetched successfully", stats));
    }
}
