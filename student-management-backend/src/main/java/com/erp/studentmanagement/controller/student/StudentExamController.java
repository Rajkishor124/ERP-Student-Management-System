package com.erp.studentmanagement.controller.student;

import com.erp.studentmanagement.dto.ExamDto;
import com.erp.studentmanagement.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/student/exams")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class StudentExamController {

    private final ExamService examService;

    @GetMapping
    public ResponseEntity<List<ExamDto>> getExamsForStudent(Principal principal) {
        return ResponseEntity.ok(examService.getExamsForStudent(principal.getName()));
    }
}
