package com.institute.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CourseRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private String category;

    private Double price;

    private Double originalPrice;

    private String thumbnail;

    private String tag;

    private String duration;

    private String level;

    private String language;

    private String syllabus;

    private String features;

    private boolean published;
}
