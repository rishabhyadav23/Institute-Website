package com.institute.backend.controller;

import com.institute.backend.dto.request.TestSubmitRequest;
import com.institute.backend.dto.response.ApiResponse;
import com.institute.backend.dto.response.TestResultResponse;
import com.institute.backend.entity.TestAttempt;
import com.institute.backend.entity.TestQuestion;
import com.institute.backend.entity.TestSeries;
import com.institute.backend.entity.User;
import com.institute.backend.exception.ResourceNotFoundException;
import com.institute.backend.repository.TestAttemptRepository;
import com.institute.backend.repository.TestQuestionRepository;
import com.institute.backend.repository.TestSeriesRepository;
import com.institute.backend.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tests")
@RequiredArgsConstructor
public class TestController {

    private final TestSeriesRepository testSeriesRepository;
    private final TestQuestionRepository testQuestionRepository;
    private final TestAttemptRepository testAttemptRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TestSeries>>> getAllTestSeries() {
        List<TestSeries> tests = testSeriesRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("Test series fetched successfully", tests));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TestSeries>> getTestSeriesById(@PathVariable Long id) {
        TestSeries test = testSeriesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Test series not found with id: " + id));

        return ResponseEntity.ok(ApiResponse.success("Test series fetched successfully", test));
    }

    @GetMapping("/{id}/questions")
    public ResponseEntity<ApiResponse<List<TestQuestion>>> getQuestions(@PathVariable Long id) {
        testSeriesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Test series not found with id: " + id));

        List<TestQuestion> questions = testQuestionRepository.findByTestSeriesId(id);
        return ResponseEntity.ok(ApiResponse.success("Questions fetched successfully", questions));
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<ApiResponse<TestResultResponse>> submitTest(
            @PathVariable Long id,
            @Valid @RequestBody TestSubmitRequest request,
            Principal principal) {

        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        TestSeries testSeries = testSeriesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Test series not found with id: " + id));

        List<TestQuestion> questions = testQuestionRepository.findByTestSeriesId(id);
        Map<Long, Character> answers = request.getAnswers();

        int correct = 0;
        int wrong = 0;
        int unanswered = 0;
        int score = 0;
        int totalMarks = 0;

        for (TestQuestion question : questions) {
            totalMarks += question.getMarks();
            Character userAnswer = answers.get(question.getId());

            if (userAnswer == null) {
                unanswered++;
            } else if (userAnswer == question.getCorrectOption()) {
                correct++;
                score += question.getMarks();
            } else {
                wrong++;
                score -= (int) question.getNegativeMarks();
            }
        }

        double percentage = totalMarks > 0 ? (score * 100.0) / totalMarks : 0;

        // Save the attempt
        TestAttempt attempt = TestAttempt.builder()
                .user(user)
                .testSeries(testSeries)
                .score(score)
                .totalMarks(totalMarks)
                .answers(answers.toString())
                .build();

        testAttemptRepository.save(attempt);

        TestResultResponse result = TestResultResponse.builder()
                .attemptId(attempt.getId())
                .score(score)
                .totalMarks(totalMarks)
                .correct(correct)
                .wrong(wrong)
                .unanswered(unanswered)
                .percentage(percentage)
                .build();

        return ResponseEntity.ok(ApiResponse.success("Test submitted successfully", result));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TestSeries>> createTestSeries(
            @Valid @RequestBody TestSeries testSeries, Principal principal) {

        TestSeries saved = testSeriesRepository.save(testSeries);
        return ResponseEntity.ok(ApiResponse.success("Test series created successfully", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TestSeries>> updateTestSeries(
            @PathVariable Long id,
            @RequestBody TestSeries updated) {

        TestSeries existing = testSeriesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Test series not found with id: " + id));

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setSubject(updated.getSubject());
        existing.setDuration(updated.getDuration());
        existing.setMaxMarks(updated.getMaxMarks());
        existing.setPrice(updated.getPrice());
        existing.setFree(updated.isFree());
        existing.setAttempts(updated.getAttempts());

        return ResponseEntity.ok(ApiResponse.success("Test series updated successfully", testSeriesRepository.save(existing)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTestSeries(@PathVariable Long id) {
        TestSeries test = testSeriesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Test series not found with id: " + id));

        // Delete all related test attempts first
        testAttemptRepository.deleteAll(testAttemptRepository.findByUserIdAndTestSeriesId(null, id).isEmpty()
                ? List.of()
                : testAttemptRepository.findAll().stream()
                    .filter(a -> a.getTestSeries().getId().equals(id))
                    .toList());

        // Delete all questions for this test
        testQuestionRepository.deleteAll(testQuestionRepository.findByTestSeriesId(id));

        // Now delete the test series
        testSeriesRepository.delete(test);

        return ResponseEntity.ok(ApiResponse.success("Test series deleted successfully", null));
    }

    @PostMapping("/{id}/questions")
    public ResponseEntity<ApiResponse<TestQuestion>> addQuestion(
            @PathVariable Long id,
            @Valid @RequestBody TestQuestion question,
            Principal principal) {

        TestSeries testSeries = testSeriesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Test series not found with id: " + id));

        question.setTestSeries(testSeries);
        TestQuestion saved = testQuestionRepository.save(question);

        // Update total questions count
        testSeries.setTotalQuestions((int) testQuestionRepository.countByTestSeriesId(id));
        testSeriesRepository.save(testSeries);

        return ResponseEntity.ok(ApiResponse.success("Question added successfully", saved));
    }

    @DeleteMapping("/{testId}/questions/{questionId}")
    public ResponseEntity<ApiResponse<Void>> deleteQuestion(
            @PathVariable Long testId,
            @PathVariable Long questionId) {

        testQuestionRepository.deleteById(questionId);

        // Update total questions count
        TestSeries testSeries = testSeriesRepository.findById(testId)
                .orElseThrow(() -> new ResourceNotFoundException("Test series not found"));
        testSeries.setTotalQuestions((int) testQuestionRepository.countByTestSeriesId(testId));
        testSeriesRepository.save(testSeries);

        return ResponseEntity.ok(ApiResponse.success("Question deleted successfully", null));
    }
}
