package com.institute.backend.controller;

import com.institute.backend.dto.request.ForgotPasswordRequest;
import com.institute.backend.dto.request.LoginRequest;
import com.institute.backend.dto.request.OAuthRequest;
import com.institute.backend.dto.request.SignupRequest;
import com.institute.backend.dto.response.ApiResponse;
import com.institute.backend.dto.response.AuthResponse;
import com.institute.backend.service.AuthService;
import com.institute.backend.service.OAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final OAuthService oAuthService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody SignupRequest request) {
        AuthResponse authResponse = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("User registered successfully", authResponse));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse authResponse = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", authResponse));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request);
        return ResponseEntity.ok(ApiResponse.success("Password reset link sent to your email", request.getEmail()));
    }

    @PostMapping("/oauth/google")
    public ResponseEntity<ApiResponse<AuthResponse>> googleLogin(@RequestBody OAuthRequest request) {
        AuthResponse authResponse = oAuthService.handleGoogleLogin(request);
        return ResponseEntity.ok(ApiResponse.success("Google login successful", authResponse));
    }

    @PostMapping("/oauth/apple")
    public ResponseEntity<ApiResponse<AuthResponse>> appleLogin(@RequestBody OAuthRequest request) {
        AuthResponse authResponse = oAuthService.handleAppleLogin(request);
        return ResponseEntity.ok(ApiResponse.success("Apple login successful", authResponse));
    }
}
