package com.institute.backend.repository;

import com.institute.backend.entity.TestSeries;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestSeriesRepository extends JpaRepository<TestSeries, Long> {
    List<TestSeries> findBySubject(String subject);
    List<TestSeries> findByFreeTrue();
}
