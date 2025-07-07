package com.erp.studentmanagement.service;

import com.erp.studentmanagement.dto.IssuedBookDto;
import com.erp.studentmanagement.dto.IssueRequest;

import java.util.List;

public interface IssuedBookService {

    // 📚 Issue a book to a student
    IssuedBookDto issueBook(IssueRequest request);

    // 🔁 Return a book
    IssuedBookDto returnBook(Long issuedBookId);

    // 👤 Get books issued to a specific student (by email/username)
    List<IssuedBookDto> getIssuedBooksForStudent(String userEmail);

    // 📋 Get all issued books (admin view)
    List<IssuedBookDto> getAllIssuedBooks();
}
