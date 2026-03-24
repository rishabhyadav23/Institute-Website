package com.institute.backend.dto.request;

import lombok.Data;

import java.util.Map;

@Data
public class TestSubmitRequest {

    private Map<Long, Character> answers;
}
