package com.erp.studentmanagement.controller.admin;

import com.erp.studentmanagement.dto.ExamDto;
import com.erp.studentmanagement.service.ExamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
public class AdminExamController {

    private final ExamService examService;

    @PostMapping
    public ResponseEntity<ExamDto> create(@Valid @RequestBody ExamDto dto) {
        return ResponseEntity.ok(examService.createExam(dto));
    }

    @GetMapping
    public ResponseEntity<List<ExamDto>> getAll() {
        return ResponseEntity.ok(examService.getAllExams());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(examService.getExamById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExamDto> update(@PathVariable Long id, @Valid @RequestBody ExamDto dto) {
        return ResponseEntity.ok(examService.updateExam(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        examService.deleteExam(id);
        return ResponseEntity.noContent().build();
    }
}
