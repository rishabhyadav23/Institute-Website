package com.institute.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseResponse {

    private Long id;
    private String title;
    private String description;
    private String category;
    private String instructorName;
    private Double rating;
    private Double price;
    private Double originalPrice;
    private String thumbnail;
    private String tag;
    private String duration;
    private String level;
    private String language;
    private int totalStudents;
    private String syllabus;
    private String features;
    private String createdAt;
}
