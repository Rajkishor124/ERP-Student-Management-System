package com.erp.studentmanagement.controller;

import com.erp.studentmanagement.dto.ExamResultDto;
import com.erp.studentmanagement.service.ExamResultService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-results")
@RequiredArgsConstructor
public class ExamResultController {

    private final ExamResultService examResultService;

    // Add or Update Result
    @PostMapping
    public ResponseEntity<ExamResultDto> addOrUpdateResult(@Valid @RequestBody ExamResultDto dto) {
        return ResponseEntity.ok(examResultService.addOrUpdateResult(dto));
    }

    // Get all results for a specific exam
    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<ExamResultDto>> getResultsByExam(@PathVariable Long examId) {
        return ResponseEntity.ok(examResultService.getResultsByExam(examId));
    }

    // Get all results for a specific student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ExamResultDto>> getResultsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(examResultService.getResultsByStudent(studentId));
    }
}
