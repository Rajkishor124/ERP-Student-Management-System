package com.erp.studentmanagement.repository;

import com.erp.studentmanagement.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByDeletedFalse();
}
