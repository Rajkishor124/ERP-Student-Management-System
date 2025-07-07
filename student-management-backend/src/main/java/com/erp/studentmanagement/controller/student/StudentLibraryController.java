package com.erp.studentmanagement.controller.student;

import com.erp.studentmanagement.dto.BookDto;
import com.erp.studentmanagement.dto.IssuedBookDto;
import com.erp.studentmanagement.service.BookService;
import com.erp.studentmanagement.service.IssuedBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/student/library")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class StudentLibraryController {

    private final BookService bookService;
    private final IssuedBookService issuedBookService;

    // 📚 View all available books (including copies left)
    @GetMapping("/books")
    public ResponseEntity<List<BookDto>> getAvailableBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    // 📖 View books issued to this student
    @GetMapping("/my-books")
    public ResponseEntity<List<IssuedBookDto>> getMyIssuedBooks(Principal principal) {
        return ResponseEntity.ok(issuedBookService.getIssuedBooksForStudent(principal.getName()));
    }
}
