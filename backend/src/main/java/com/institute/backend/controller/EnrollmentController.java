package com.institute.backend.controller;

import com.institute.backend.dto.response.ApiResponse;
import com.institute.backend.entity.Course;
import com.institute.backend.entity.Enrollment;
import com.institute.backend.entity.User;
import com.institute.backend.exception.BadRequestException;
import com.institute.backend.exception.ResourceNotFoundException;
import com.institute.backend.repository.CourseRepository;
import com.institute.backend.repository.EnrollmentRepository;
import com.institute.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<Enrollment>> enroll(
            @RequestParam Long courseId,
            @RequestParam String paymentId,
            @RequestParam Double amount,
            Principal principal) {

        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        if (enrollmentRepository.existsByUserIdAndCourseId(user.getId(), courseId)) {
            throw new BadRequestException("You are already enrolled in this course");
        }

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .paymentId(paymentId)
                .amount(amount)
                .build();

        enrollmentRepository.save(enrollment);

        // Increment total students count
        course.setTotalStudents(course.getTotalStudents() + 1);
        courseRepository.save(course);

        return ResponseEntity.ok(ApiResponse.success("Enrolled successfully", enrollment));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Enrollment>>> getUserEnrollments(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Enrollment> enrollments = enrollmentRepository.findByUserId(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Enrollments fetched successfully", enrollments));
    }

    @GetMapping("/check")
    public ResponseEntity<ApiResponse<Boolean>> isEnrolled(
            @RequestParam Long courseId, Principal principal) {

        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        boolean enrolled = enrollmentRepository.existsByUserIdAndCourseId(user.getId(), courseId);
        return ResponseEntity.ok(ApiResponse.success("Enrollment check completed", enrolled));
    }
}
