package com.erp.studentmanagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateStudentRequest(
        @NotBlank(message = "Name is required")
        String name,

        @Email(message = "Enter a valid email")
        @NotBlank(message = "Email is required")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        String password,

        @NotBlank(message = "Roll number is required")
        String rollNumber,

        @NotBlank(message = "Department is required")
        String department,

        @NotBlank(message = "Course is required")
        String course,

        @NotBlank(message = "Semester is required")
        String semester
) {}
