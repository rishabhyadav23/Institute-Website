package com.institute.backend.repository;

import com.institute.backend.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findBySubject(String subject);
    List<Note> findByCourseId(Long courseId);
}
