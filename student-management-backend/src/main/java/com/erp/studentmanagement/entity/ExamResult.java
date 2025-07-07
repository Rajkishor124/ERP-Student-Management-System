package com.erp.studentmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Exam exam;

    @ManyToOne(optional = false)
    private Student student;

    private double marksObtained;

    private String grade; // Optional: A+, B, etc.
}
