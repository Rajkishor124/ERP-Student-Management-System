package com.erp.studentmanagement.repository;

import com.erp.studentmanagement.entity.Attendance;
import com.erp.studentmanagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // Find all attendance records for a student
    List<Attendance> findByStudent(Student student);

    // Optional: Find attendance by student and date (for duplicate prevention or specific queries)
    Attendance findByStudentAndDate(Student student, LocalDate date);

    List<Attendance> findByDate(LocalDate date);

}
