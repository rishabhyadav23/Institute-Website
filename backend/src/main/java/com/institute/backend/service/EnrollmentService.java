package com.institute.backend.service;

import com.institute.backend.entity.Course;
import com.institute.backend.entity.Enrollment;
import com.institute.backend.entity.User;
import com.institute.backend.exception.BadRequestException;
import com.institute.backend.exception.ResourceNotFoundException;
import com.institute.backend.repository.CourseRepository;
import com.institute.backend.repository.EnrollmentRepository;
import com.institute.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public Enrollment enrollUser(Long userId, Long courseId, String paymentId, Double amount) {
        if (enrollmentRepository.existsByUserIdAndCourseId(userId, courseId)) {
            throw new BadRequestException("User is already enrolled in this course");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .paymentId(paymentId)
                .amount(amount)
                .status(Enrollment.Status.ACTIVE)
                .build();

        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getUserEnrollments(Long userId) {
        return enrollmentRepository.findByUserId(userId);
    }

    public boolean isEnrolled(Long userId, Long courseId) {
        return enrollmentRepository.existsByUserIdAndCourseId(userId, courseId);
    }
}
