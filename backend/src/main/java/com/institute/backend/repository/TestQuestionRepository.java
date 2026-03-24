package com.institute.backend.repository;

import com.institute.backend.entity.TestQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestQuestionRepository extends JpaRepository<TestQuestion, Long> {
    List<TestQuestion> findByTestSeriesId(Long testSeriesId);
    long countByTestSeriesId(Long testSeriesId);
}
