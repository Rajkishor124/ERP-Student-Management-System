package com.erp.studentmanagement.repository;

import com.erp.studentmanagement.entity.Exam;
import com.erp.studentmanagement.entity.ExamResult;
import com.erp.studentmanagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
    List<ExamResult> findByExam(Exam exam);
    List<ExamResult> findByStudent(Student student);
    Optional<ExamResult> findByExamAndStudent(Exam exam, Student student);
}
