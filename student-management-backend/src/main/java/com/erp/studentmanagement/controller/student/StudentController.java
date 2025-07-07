package com.erp.studentmanagement.controller.student;

import com.erp.studentmanagement.dto.StudentDto;
import com.erp.studentmanagement.entity.Student;
import com.erp.studentmanagement.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/profile")
    public ResponseEntity<StudentDto> getProfile(Authentication authentication) {
        String email = authentication.getName();
        Student student = studentService.getStudentByEmail(email);
        StudentDto dto = studentService.toDto(student);
        return ResponseEntity.ok(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<StudentDto> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/filter")
    public ResponseEntity<List<StudentDto>> filterStudents(
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String search
    ) {
        List<Student> students = studentService.filterStudents(course, department, search);
        List<StudentDto> dtos = students.stream().map(studentService::toDto).toList();
        return ResponseEntity.ok(dtos);
    }

}
