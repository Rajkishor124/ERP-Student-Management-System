package com.erp.studentmanagement.controller;

import com.erp.studentmanagement.dto.IssueRequest;
import com.erp.studentmanagement.dto.IssuedBookDto;
import com.erp.studentmanagement.service.IssuedBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/library")
@RequiredArgsConstructor
public class IssuedBookController {

    private final IssuedBookService issuedBookService;

    // 🔐 Only ADMIN can issue books
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/issue")
    public ResponseEntity<IssuedBookDto> issueBook(@RequestBody IssueRequest request) {
        IssuedBookDto dto = issuedBookService.issueBook(request);
        return ResponseEntity.ok(dto);
    }

    // 🔐 Only ADMIN can return books
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/return/{issuedBookId}")
    public ResponseEntity<IssuedBookDto> returnBook(@PathVariable Long issuedBookId) {
        IssuedBookDto dto = issuedBookService.returnBook(issuedBookId);
        return ResponseEntity.ok(dto);
    }

    // 👨‍🎓 STUDENT can view only their own issued books
    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/my-books")
    public ResponseEntity<List<IssuedBookDto>> getMyIssuedBooks(Authentication authentication) {
        String email = authentication.getName();
        List<IssuedBookDto> books = issuedBookService.getIssuedBooksForStudent(email);
        return ResponseEntity.ok(books);
    }

    // 🔐 ADMIN can view all issued books
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<IssuedBookDto>> getAllIssuedBooks() {
        return ResponseEntity.ok(issuedBookService.getAllIssuedBooks());
    }
}
