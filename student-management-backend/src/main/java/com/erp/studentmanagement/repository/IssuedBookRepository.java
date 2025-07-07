package com.erp.studentmanagement.repository;

import com.erp.studentmanagement.entity.Book;
import com.erp.studentmanagement.entity.IssuedBook;
import com.erp.studentmanagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssuedBookRepository extends JpaRepository<IssuedBook, Long> {
    boolean existsByBookAndReturnedFalse(Book book);
    boolean existsByBookAndStudentAndReturnedFalse(Book book, Student student);
    List<IssuedBook> findByStudent(Student student);
}
