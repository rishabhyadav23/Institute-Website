package com.institute.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TestResultResponse {

    private Long attemptId;
    private int score;
    private int totalMarks;
    private int correct;
    private int wrong;
    private int unanswered;
    private int timeTaken;
    private double percentage;
}
