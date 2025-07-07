package com.erp.studentmanagement.service.impl;

import com.erp.studentmanagement.dto.ExamDto;
import com.erp.studentmanagement.entity.Exam;
import com.erp.studentmanagement.entity.Student;
import com.erp.studentmanagement.repository.ExamRepository;
import com.erp.studentmanagement.repository.StudentRepository;
import com.erp.studentmanagement.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService {

    private final ExamRepository examRepository;
    private final StudentRepository studentRepository;

    @Override
    public ExamDto createExam(ExamDto dto) {
        Exam exam = toEntity(dto);
        return toDto(examRepository.save(exam));
    }

    @Override
    public List<ExamDto> getAllExams() {
        return examRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ExamDto getExamById(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Exam not found"));
        return toDto(exam);
    }

    @Override
    public ExamDto updateExam(Long id, ExamDto dto) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Exam not found"));

        exam.setTitle(dto.getTitle());
        exam.setDate(dto.getDate());
        exam.setStartTime(dto.getStartTime());
        exam.setDurationMinutes(dto.getDurationMinutes());
        exam.setCourse(dto.getCourse());
        exam.setDepartment(dto.getDepartment());
        exam.setSemester(dto.getSemester());

        return toDto(examRepository.save(exam));
    }

    @Override
    public void deleteExam(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Exam not found"));
        examRepository.delete(exam);
    }

    @Override
    public List<ExamDto> getExamsForStudent(String email) {
        Student student = studentRepository.findByUserEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        List<Exam> exams;

        if (student.getSemester() != null && !student.getSemester().isBlank()) {
            exams = examRepository.findByCourseIgnoreCaseAndDepartmentIgnoreCaseAndSemesterIgnoreCase(
                    student.getCourse(),
                    student.getDepartment(),
                    student.getSemester()
            );
        } else {
            exams = examRepository.findByCourseIgnoreCaseAndDepartmentIgnoreCaseAndSemesterIsNull(
                    student.getCourse(),
                    student.getDepartment()
            );
        }

        return exams.stream().map(this::toDto).toList();
    }

    private Exam toEntity(ExamDto dto) {
        return Exam.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .date(dto.getDate())
                .startTime(dto.getStartTime())
                .durationMinutes(dto.getDurationMinutes())
                .course(dto.getCourse())
                .department(dto.getDepartment())
                .semester(dto.getSemester())
                .build();
    }

    private ExamDto toDto(Exam exam) {
        ExamDto dto = new ExamDto();
        dto.setId(exam.getId());
        dto.setTitle(exam.getTitle());
        dto.setDate(exam.getDate());
        dto.setStartTime(exam.getStartTime());
        dto.setDurationMinutes(exam.getDurationMinutes());
        dto.setCourse(exam.getCourse());
        dto.setDepartment(exam.getDepartment());
        dto.setSemester(exam.getSemester());
        return dto;
    }
}
