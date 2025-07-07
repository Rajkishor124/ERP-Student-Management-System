package com.erp.studentmanagement.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ExamDto {

    private Long id;

    @NotBlank(message = "Exam title is required")
    private String title;

    @NotNull(message = "Exam date is required")
    private LocalDate date;

    @NotNull(message = "Start time is required")
    private LocalTime startTime;

    @Min(value = 10, message = "Duration should be at least 10 minutes")
    @Max(value = 300, message = "Duration cannot exceed 5 hours")
    private int durationMinutes;

    @NotBlank(message = "Course is required")
    private String course;

    @NotBlank(message = "Department is required")
    private String department;

    private String semester; // Optional
}
