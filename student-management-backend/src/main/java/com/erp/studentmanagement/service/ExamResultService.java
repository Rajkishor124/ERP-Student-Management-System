package com.erp.studentmanagement.service;

import com.erp.studentmanagement.dto.ExamResultDto;

import java.util.List;

public interface ExamResultService {

    ExamResultDto addOrUpdateResult(ExamResultDto dto);

    List<ExamResultDto> getResultsByExam(Long examId);

    List<ExamResultDto> getResultsByStudent(Long studentId);
}
