package com.erp.studentmanagement.controller.admin;

import com.erp.studentmanagement.dto.CreateStudentRequest;
import com.erp.studentmanagement.dto.StudentDto;
import com.erp.studentmanagement.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')") // All endpoints inside this controller require ADMIN
public class AdminController {

    private final StudentService studentService;

    @PostMapping("/students")
    public ResponseEntity<StudentDto> createStudent(@RequestBody CreateStudentRequest request) {
        StudentDto dto = studentService.createStudent(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<StudentDto> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<StudentDto> updateStudent(@PathVariable Long id, @RequestBody CreateStudentRequest request) {
        return ResponseEntity.ok(studentService.updateStudent(id, request));
    }
}
