package com.institute.backend.service;

import com.institute.backend.dto.request.TestSubmitRequest;
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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestSeriesRepository testSeriesRepository;
    private final TestQuestionRepository testQuestionRepository;
    private final TestAttemptRepository testAttemptRepository;
    private final UserRepository userRepository;

    public List<TestSeries> getAllTestSeries() {
        return testSeriesRepository.findAll();
    }

    public TestSeries getTestSeriesById(Long id) {
        return testSeriesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Test series not found with id: " + id));
    }

    public List<TestQuestion> getQuestions(Long testSeriesId) {
        testSeriesRepository.findById(testSeriesId)
                .orElseThrow(() -> new ResourceNotFoundException("Test series not found with id: " + testSeriesId));
        return testQuestionRepository.findByTestSeriesId(testSeriesId);
    }

    @Transactional
    public TestResultResponse submitTest(Long testSeriesId, Long userId, TestSubmitRequest request) {
        TestSeries testSeries = testSeriesRepository.findById(testSeriesId)
                .orElseThrow(() -> new ResourceNotFoundException("Test series not found with id: " + testSeriesId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        List<TestQuestion> questions = testQuestionRepository.findByTestSeriesId(testSeriesId);
        Map<Long, Character> answers = request.getAnswers();

        int score = 0;
        int correct = 0;
        int wrong = 0;
        int unanswered = 0;
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

        // Ensure score doesn't go below zero
        score = Math.max(score, 0);

        double percentage = totalMarks > 0 ? (score * 100.0) / totalMarks : 0.0;

        TestAttempt attempt = TestAttempt.builder()
                .user(user)
                .testSeries(testSeries)
                .score(score)
                .totalMarks(totalMarks)
                .answers(answers.toString())
                .build();

        TestAttempt savedAttempt = testAttemptRepository.save(attempt);

        return TestResultResponse.builder()
                .attemptId(savedAttempt.getId())
                .score(score)
                .totalMarks(totalMarks)
                .correct(correct)
                .wrong(wrong)
                .unanswered(unanswered)
                .percentage(percentage)
                .build();
    }

    @Transactional
    public TestSeries createTestSeries(TestSeries testSeries) {
        return testSeriesRepository.save(testSeries);
    }

    @Transactional
    public TestQuestion addQuestion(Long testSeriesId, TestQuestion question) {
        TestSeries testSeries = testSeriesRepository.findById(testSeriesId)
                .orElseThrow(() -> new ResourceNotFoundException("Test series not found with id: " + testSeriesId));

        question.setTestSeries(testSeries);
        TestQuestion savedQuestion = testQuestionRepository.save(question);

        // Update total questions count
        long questionCount = testQuestionRepository.countByTestSeriesId(testSeriesId);
        testSeries.setTotalQuestions((int) questionCount);
        testSeriesRepository.save(testSeries);

        return savedQuestion;
    }

    public List<TestAttempt> getUserAttempts(Long userId) {
        return testAttemptRepository.findByUserId(userId);
    }
}
