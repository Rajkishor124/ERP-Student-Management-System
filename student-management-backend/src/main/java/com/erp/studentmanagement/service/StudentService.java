package com.erp.studentmanagement.service;

import com.erp.studentmanagement.dto.CreateStudentRequest;
import com.erp.studentmanagement.dto.StudentDto;
import com.erp.studentmanagement.entity.Student;

import java.util.List;

public interface StudentService {

    Student getStudentByEmail(String email);

    StudentDto toDto(Student student);

    StudentDto createStudent(CreateStudentRequest request);

    List<StudentDto> getAllStudents();

    StudentDto getStudentById(Long id); // ✅ NEW

    StudentDto updateStudent(Long id, CreateStudentRequest request); // ✅ NEW

    void deleteStudent(Long id);

    List<Student> filterStudents(String course, String department, String search);

}
