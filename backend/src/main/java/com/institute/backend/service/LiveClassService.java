package com.institute.backend.service;

import com.institute.backend.entity.LiveClass;
import com.institute.backend.exception.ResourceNotFoundException;
import com.institute.backend.repository.LiveClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LiveClassService {

    private final LiveClassRepository liveClassRepository;

    public List<LiveClass> getAllLiveClasses() {
        return liveClassRepository.findAll();
    }

    public List<LiveClass> getUpcomingClasses() {
        return liveClassRepository.findByScheduledAtAfterOrderByScheduledAtAsc(LocalDateTime.now());
    }

    public LiveClass getLiveClassById(Long id) {
        return liveClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Live class not found with id: " + id));
    }

    @Transactional
    public LiveClass createLiveClass(LiveClass liveClass) {
        return liveClassRepository.save(liveClass);
    }

    @Transactional
    public LiveClass updateStatus(Long id, LiveClass.Status status) {
        LiveClass liveClass = liveClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Live class not found with id: " + id));
        liveClass.setStatus(status);
        return liveClassRepository.save(liveClass);
    }
}
