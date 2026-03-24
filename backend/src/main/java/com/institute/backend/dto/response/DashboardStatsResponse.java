package com.institute.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardStatsResponse {

    private long totalStudents;
    private long totalCourses;
    private long totalTests;
    private long totalLiveClasses;
}
