package com.institute.backend.controller;

import com.institute.backend.dto.request.CourseRequest;
import com.institute.backend.dto.response.ApiResponse;
import com.institute.backend.dto.response.CourseResponse;
import com.institute.backend.entity.Course;
import com.institute.backend.entity.User;
import com.institute.backend.exception.ResourceNotFoundException;
import com.institute.backend.repository.CourseRepository;
import com.institute.backend.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseResponse>>> getAllCourses(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String query) {

        List<Course> courses;

        if (category != null && !category.isBlank()) {
            courses = courseRepository.findByCategory(category);
        } else if (query != null && !query.isBlank()) {
            courses = courseRepository.findByTitleContainingIgnoreCaseOrCategoryContainingIgnoreCase(query, query);
        } else {
            courses = courseRepository.findByPublishedTrue();
        }

        List<CourseResponse> response = courses.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success("Courses fetched successfully", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> getCourseById(@PathVariable Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        return ResponseEntity.ok(ApiResponse.success("Course fetched successfully", mapToResponse(course)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CourseResponse>> createCourse(
            @Valid @RequestBody CourseRequest request, Principal principal) {

        User instructor = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Course course = Course.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .instructor(instructor)
                .price(request.getPrice())
                .originalPrice(request.getOriginalPrice())
                .thumbnail(request.getThumbnail())
                .tag(request.getTag())
                .duration(request.getDuration())
                .level(request.getLevel())
                .language(request.getLanguage())
                .syllabus(request.getSyllabus())
                .features(request.getFeatures())
                .published(request.isPublished())
                .build();

        courseRepository.save(course);

        return ResponseEntity.ok(ApiResponse.success("Course created successfully", mapToResponse(course)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> updateCourse(
            @PathVariable Long id, @Valid @RequestBody CourseRequest request, Principal principal) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setCategory(request.getCategory());
        course.setPrice(request.getPrice());
        course.setOriginalPrice(request.getOriginalPrice());
        course.setThumbnail(request.getThumbnail());
        course.setTag(request.getTag());
        course.setDuration(request.getDuration());
        course.setLevel(request.getLevel());
        course.setLanguage(request.getLanguage());
        course.setSyllabus(request.getSyllabus());
        course.setFeatures(request.getFeatures());
        course.setPublished(request.isPublished());

        courseRepository.save(course);

        return ResponseEntity.ok(ApiResponse.success("Course updated successfully", mapToResponse(course)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Long id, Principal principal) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        courseRepository.delete(course);

        return ResponseEntity.ok(ApiResponse.success("Course deleted successfully", null));
    }

    private CourseResponse mapToResponse(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .category(course.getCategory())
                .instructorName(course.getInstructor() != null ? course.getInstructor().getFullName() : null)
                .rating(course.getRating())
                .price(course.getPrice())
                .originalPrice(course.getOriginalPrice())
                .thumbnail(course.getThumbnail())
                .tag(course.getTag())
                .duration(course.getDuration())
                .level(course.getLevel())
                .language(course.getLanguage())
                .totalStudents(course.getTotalStudents())
                .syllabus(course.getSyllabus())
                .features(course.getFeatures())
                .createdAt(course.getCreatedAt() != null ? course.getCreatedAt().toString() : null)
                .build();
    }
}
