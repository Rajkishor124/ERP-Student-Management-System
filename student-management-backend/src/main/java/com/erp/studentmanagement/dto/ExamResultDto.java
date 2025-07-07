package com.erp.studentmanagement.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExamResultDto {

    private Long id;

    @NotNull(message = "Exam ID is required")
    private Long examId;

    @NotNull(message = "Student ID is required")
    private Long studentId;

    @Min(value = 0, message = "Marks must be non-negative")
    private double marksObtained;

    private String grade;
}
