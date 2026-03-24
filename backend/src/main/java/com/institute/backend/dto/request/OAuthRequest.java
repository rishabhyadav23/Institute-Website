package com.institute.backend.dto.request;

import lombok.Data;

@Data
public class OAuthRequest {
    private String idToken;
    private String authorizationCode;
    private String fullName;
}
