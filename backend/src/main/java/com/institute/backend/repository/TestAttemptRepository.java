package com.institute.backend.repository;

import com.institute.backend.entity.TestAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestAttemptRepository extends JpaRepository<TestAttempt, Long> {
    List<TestAttempt> findByUserId(Long userId);
    List<TestAttempt> findByUserIdAndTestSeriesId(Long userId, Long testSeriesId);
}
