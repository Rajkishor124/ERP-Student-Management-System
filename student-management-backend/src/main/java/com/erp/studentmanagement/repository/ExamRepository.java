package com.erp.studentmanagement.repository;

import com.erp.studentmanagement.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Long> {

    List<Exam> findByCourseIgnoreCaseAndDepartmentIgnoreCaseAndSemesterIgnoreCase(String course, String department, String semester);

    List<Exam> findByCourseIgnoreCaseAndDepartmentIgnoreCaseAndSemesterIsNull(String course, String department);
}
