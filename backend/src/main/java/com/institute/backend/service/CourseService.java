package com.institute.backend.service;

import com.institute.backend.dto.request.CourseRequest;
import com.institute.backend.dto.response.CourseResponse;
import com.institute.backend.entity.Course;
import com.institute.backend.entity.User;
import com.institute.backend.exception.ResourceNotFoundException;
import com.institute.backend.repository.CourseRepository;
import com.institute.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public List<CourseResponse> getAllCourses() {
        return courseRepository.findByPublishedTrue()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        return mapToResponse(course);
    }

    public List<CourseResponse> getCoursesByCategory(String category) {
        return courseRepository.findByCategory(category)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<CourseResponse> searchCourses(String query) {
        return courseRepository.findByTitleContainingIgnoreCaseOrCategoryContainingIgnoreCase(query, query)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public CourseResponse createCourse(CourseRequest request, Long instructorId) {
        User instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found with id: " + instructorId));

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

        Course saved = courseRepository.save(course);
        return mapToResponse(saved);
    }

    @Transactional
    public CourseResponse updateCourse(Long id, CourseRequest request) {
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

        Course updated = courseRepository.save(course);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        courseRepository.delete(course);
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
