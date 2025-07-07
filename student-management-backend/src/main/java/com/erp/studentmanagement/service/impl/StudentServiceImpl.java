package com.erp.studentmanagement.service.impl;

import com.erp.studentmanagement.dto.CreateStudentRequest;
import com.erp.studentmanagement.dto.StudentDto;
import com.erp.studentmanagement.entity.Role;
import com.erp.studentmanagement.entity.Student;
import com.erp.studentmanagement.entity.User;
import com.erp.studentmanagement.repository.StudentRepository;
import com.erp.studentmanagement.repository.UserRepository;
import com.erp.studentmanagement.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Student getStudentByEmail(String email) {
        return studentRepository.findByUserEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
    }

    @Override
    public StudentDto toDto(Student student) {
        return StudentDto.builder()
                .id(student.getId())
                .name(student.getName())
                .email(student.getUser().getEmail())
                .rollNumber(student.getRollNumber())
                .department(student.getDepartment())
                .course(student.getCourse())
                .semester(student.getSemester())
                .build();
    }

    @Override
    public StudentDto createStudent(CreateStudentRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.ROLE_STUDENT)
                .build();

        userRepository.save(user);

        Student student = Student.builder()
                .name(request.name())
                .rollNumber(request.rollNumber())
                .department(request.department())
                .course(request.course())
                .semester(request.semester())
                .user(user)
                .build();

        studentRepository.save(student);

        return toDto(student);
    }

    @Override
    public List<StudentDto> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public StudentDto getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
        return toDto(student);
    }

    @Override
    public StudentDto updateStudent(Long id, CreateStudentRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        // Update student fields
        student.setName(request.name());
        student.setRollNumber(request.rollNumber());
        student.setDepartment(request.department());
        student.setCourse(request.course());
        student.setSemester(request.semester());

        // Also update user email, name, and password (if changed)
        User user = student.getUser();
        user.setName(request.name());
        user.setEmail(request.email());

        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }

        userRepository.save(user);
        studentRepository.save(student);

        return toDto(student);
    }

    @Override
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        if (student.getUser() != null) {
            userRepository.delete(student.getUser());
        }

        studentRepository.delete(student);
    }

    public List<Student> filterStudents(String course, String department, String search) {
        return studentRepository.filterStudents(
                course != null && !course.isBlank() ? course : null,
                department != null && !department.isBlank() ? department : null,
                search != null && !search.isBlank() ? search : null
        );
    }

}
