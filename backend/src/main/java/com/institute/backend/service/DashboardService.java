package com.institute.backend.service;

import com.institute.backend.dto.response.DashboardStatsResponse;
import com.institute.backend.entity.User;
import com.institute.backend.repository.CourseRepository;
import com.institute.backend.repository.LiveClassRepository;
import com.institute.backend.repository.TestSeriesRepository;
import com.institute.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final TestSeriesRepository testSeriesRepository;
    private final LiveClassRepository liveClassRepository;

    public DashboardStatsResponse getStats() {
        long totalStudents = userRepository.countByRole(User.Role.STUDENT);
        long totalCourses = courseRepository.count();
        long totalTests = testSeriesRepository.count();
        long totalLiveClasses = liveClassRepository.count();

        return DashboardStatsResponse.builder()
                .totalStudents(totalStudents)
                .totalCourses(totalCourses)
                .totalTests(totalTests)
                .totalLiveClasses(totalLiveClasses)
                .build();
    }
}
