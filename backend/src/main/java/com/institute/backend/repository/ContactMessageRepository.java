package com.institute.backend.repository;

import com.institute.backend.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findByReadFalse();
    List<ContactMessage> findAllByOrderByCreatedAtDesc();
}
