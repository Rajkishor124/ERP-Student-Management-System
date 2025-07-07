package com.erp.studentmanagement.service.impl;

import com.erp.studentmanagement.dto.ExamResultDto;
import com.erp.studentmanagement.entity.Exam;
import com.erp.studentmanagement.entity.ExamResult;
import com.erp.studentmanagement.entity.Student;
import com.erp.studentmanagement.repository.ExamRepository;
import com.erp.studentmanagement.repository.ExamResultRepository;
import com.erp.studentmanagement.repository.StudentRepository;
import com.erp.studentmanagement.service.ExamResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamResultServiceImpl implements ExamResultService {

    private final ExamRepository examRepository;
    private final StudentRepository studentRepository;
    private final ExamResultRepository resultRepository;

    @Override
    public ExamResultDto addOrUpdateResult(ExamResultDto dto) {
        Exam exam = examRepository.findById(dto.getExamId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Exam not found"));

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        ExamResult result = resultRepository.findByExamAndStudent(exam, student)
                .orElse(ExamResult.builder()
                        .exam(exam)
                        .student(student)
                        .build());

        result.setMarksObtained(dto.getMarksObtained());
        result.setGrade(dto.getGrade());

        return toDto(resultRepository.save(result));
    }

    @Override
    public List<ExamResultDto> getResultsByExam(Long examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Exam not found"));

        return resultRepository.findByExam(exam)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExamResultDto> getResultsByStudent(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        return resultRepository.findByStudent(student)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private ExamResultDto toDto(ExamResult result) {
        ExamResultDto dto = new ExamResultDto();
        dto.setId(result.getId());
        dto.setExamId(result.getExam().getId());
        dto.setStudentId(result.getStudent().getId());
        dto.setMarksObtained(result.getMarksObtained());
        dto.setGrade(result.getGrade());
        return dto;
    }
}
