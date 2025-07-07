package com.erp.studentmanagement.service;

import com.erp.studentmanagement.dto.ExamDto;

import java.util.List;

public interface ExamService {
    ExamDto createExam(ExamDto dto);
    List<ExamDto> getAllExams();
    ExamDto getExamById(Long id);
    ExamDto updateExam(Long id, ExamDto dto);
    void deleteExam(Long id);

    List<ExamDto> getExamsForStudent(String email);
}
