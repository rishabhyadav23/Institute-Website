package com.institute.backend.controller;

import com.institute.backend.dto.request.ContactRequest;
import com.institute.backend.dto.response.ApiResponse;
import com.institute.backend.entity.ContactMessage;
import com.institute.backend.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ApiResponse<ContactMessage>> submitMessage(
            @Valid @RequestBody ContactRequest request) {

        ContactMessage message = contactService.submitMessage(request);
        return ResponseEntity.ok(ApiResponse.success("Message sent successfully", message));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ContactMessage>>> getAllMessages(Principal principal) {
        List<ContactMessage> messages = contactService.getAllMessages();
        return ResponseEntity.ok(ApiResponse.success("Messages fetched successfully", messages));
    }

    @GetMapping("/unread")
    public ResponseEntity<ApiResponse<List<ContactMessage>>> getUnread(Principal principal) {
        List<ContactMessage> messages = contactService.getUnreadMessages();
        return ResponseEntity.ok(ApiResponse.success("Unread messages fetched successfully", messages));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Void>> markAsRead(
            @PathVariable Long id, Principal principal) {

        contactService.markAsRead(id);
        return ResponseEntity.ok(ApiResponse.success("Message marked as read", null));
    }
}
