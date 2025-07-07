package com.erp.studentmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceSummaryDto {
    private Long studentId;
    private String studentName;
    private String course;
    private String department;
    private String semester;
    private int totalDays;
    private int presentDays;
    private int absentDays;
    private double attendancePercentage;
}
