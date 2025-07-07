package com.erp.studentmanagement.repository;

import com.erp.studentmanagement.entity.Student;
import com.erp.studentmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByUserEmail(String email);

    Optional<Student> findByUser(User user);

    @Query("""
        SELECT s FROM Student s
        WHERE (:course IS NULL OR LOWER(s.course) LIKE LOWER(CONCAT(:course, '%')))
          AND (:department IS NULL OR LOWER(s.department) LIKE LOWER(CONCAT(:department, '%')))
          AND (
            :search IS NULL OR
            LOWER(s.name) LIKE LOWER(CONCAT('%', :search, '%')) OR
            LOWER(s.rollNumber) LIKE LOWER(CONCAT('%', :search, '%'))
          )
    """)
    List<Student> filterStudents(
            @Param("course") String course,
            @Param("department") String department,
            @Param("search") String search
    );
}
