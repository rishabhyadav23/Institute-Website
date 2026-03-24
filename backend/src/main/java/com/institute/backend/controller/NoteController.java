package com.institute.backend.controller;

import com.institute.backend.dto.response.ApiResponse;
import com.institute.backend.entity.Note;
import com.institute.backend.exception.ResourceNotFoundException;
import com.institute.backend.repository.NoteRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteRepository noteRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Note>>> getAllNotes(
            @RequestParam(required = false) String subject) {

        List<Note> notes;

        if (subject != null && !subject.isBlank()) {
            notes = noteRepository.findBySubject(subject);
        } else {
            notes = noteRepository.findAll();
        }

        return ResponseEntity.ok(ApiResponse.success("Notes fetched successfully", notes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Note>> getNoteById(@PathVariable Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + id));

        return ResponseEntity.ok(ApiResponse.success("Note fetched successfully", note));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Note>> createNote(@Valid @RequestBody Note note, Principal principal) {
        Note saved = noteRepository.save(note);
        return ResponseEntity.ok(ApiResponse.success("Note created successfully", saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteNote(@PathVariable Long id, Principal principal) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + id));

        noteRepository.delete(note);

        return ResponseEntity.ok(ApiResponse.success("Note deleted successfully", null));
    }
}
