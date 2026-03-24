package com.institute.backend.repository;

import com.institute.backend.entity.LiveClass;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface LiveClassRepository extends JpaRepository<LiveClass, Long> {
    List<LiveClass> findByStatus(LiveClass.Status status);
    List<LiveClass> findByScheduledAtAfterOrderByScheduledAtAsc(LocalDateTime now);
}
