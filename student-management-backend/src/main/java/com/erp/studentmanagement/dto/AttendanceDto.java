package com.erp.studentmanagement.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class AttendanceDto {
    private Long id;
    private Long studentId;
    private String studentName;
    private LocalDate date;
    private String status;  // "PRESENT" or "ABSENT"
}
