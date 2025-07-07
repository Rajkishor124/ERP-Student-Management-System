package com.erp.studentmanagement.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class IssuedBookDto {
    private Long id;
    private String bookTitle;
    private String studentName;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private Boolean returned;      // ✅ ensure this exists
    private LocalDate returnDate;  // ✅ ensure this exists
}
