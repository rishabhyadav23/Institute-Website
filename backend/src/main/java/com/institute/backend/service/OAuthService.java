package com.institute.backend.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.institute.backend.dto.request.OAuthRequest;
import com.institute.backend.dto.response.AuthResponse;
import com.institute.backend.entity.User;
import com.institute.backend.exception.BadRequestException;
import com.institute.backend.repository.UserRepository;
import com.institute.backend.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.oauth.google.client-id:}")
    private String googleClientId;

    @Transactional
    public AuthResponse handleGoogleLogin(OAuthRequest request) {
        if (request.getIdToken() == null || request.getIdToken().isEmpty()) {
            throw new BadRequestException("Google ID token is required");
        }

        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getIdToken());
            if (idToken == null) {
                throw new BadRequestException("Invalid Google token");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");

            return findOrCreateUser(email, name, pictureUrl);

        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            log.error("Google OAuth verification failed", e);
            throw new BadRequestException("Google authentication failed: " + e.getMessage());
        }
    }

    @Transactional
    public AuthResponse handleAppleLogin(OAuthRequest request) {
        if (request.getIdToken() == null || request.getIdToken().isEmpty()) {
            throw new BadRequestException("Apple ID token is required");
        }

        try {
            // Decode Apple JWT to extract email (Apple tokens are JWTs)
            // In production, verify with Apple's public keys
            String[] parts = request.getIdToken().split("\\.");
            if (parts.length != 3) {
                throw new BadRequestException("Invalid Apple token format");
            }

            String payloadJson = new String(java.util.Base64.getUrlDecoder().decode(parts[1]));
            com.google.api.client.json.JsonParser parser = GsonFactory.getDefaultInstance()
                    .createJsonParser(payloadJson);
            java.util.Map<String, Object> claims = new java.util.HashMap<>();
            parser.parse(claims);

            String email = (String) claims.get("email");
            if (email == null || email.isEmpty()) {
                throw new BadRequestException("Email not found in Apple token");
            }

            String name = request.getFullName();
            if (name == null || name.isEmpty()) {
                name = email.split("@")[0];
            }

            return findOrCreateUser(email, name, null);

        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            log.error("Apple OAuth verification failed", e);
            throw new BadRequestException("Apple authentication failed: " + e.getMessage());
        }
    }

    private AuthResponse findOrCreateUser(String email, String name, String profileImage) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        User user;
        if (existingUser.isPresent()) {
            user = existingUser.get();
            // Update profile image if available
            if (profileImage != null && (user.getProfileImage() == null || user.getProfileImage().isEmpty())) {
                user.setProfileImage(profileImage);
                userRepository.save(user);
            }
            log.info("OAuth login for existing user: {}", email);
        } else {
            // Create new user
            user = User.builder()
                    .fullName(name != null ? name : "User")
                    .email(email)
                    .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                    .role(User.Role.STUDENT)
                    .profileImage(profileImage)
                    .enabled(true)
                    .build();
            userRepository.save(user);
            log.info("OAuth signup - new user created: {}", email);
        }

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
