package com.institute.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "test_series")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestSeries {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    private String subject;

    @Builder.Default
    private int totalQuestions = 0;

    private int duration;

    private int maxMarks;

    private Double price;

    @Builder.Default
    private boolean free = false;

    @Builder.Default
    private int attempts = 1;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
