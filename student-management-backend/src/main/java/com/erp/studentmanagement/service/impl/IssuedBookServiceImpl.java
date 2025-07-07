package com.erp.studentmanagement.service.impl;

import com.erp.studentmanagement.dto.IssueRequest;
import com.erp.studentmanagement.dto.IssuedBookDto;
import com.erp.studentmanagement.entity.Book;
import com.erp.studentmanagement.entity.IssuedBook;
import com.erp.studentmanagement.entity.Student;
import com.erp.studentmanagement.repository.BookRepository;
import com.erp.studentmanagement.repository.IssuedBookRepository;
import com.erp.studentmanagement.repository.StudentRepository;
import com.erp.studentmanagement.service.IssuedBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IssuedBookServiceImpl implements IssuedBookService {

    private final BookRepository bookRepository;
    private final StudentRepository studentRepository;
    private final IssuedBookRepository issuedBookRepository;

    @Override
    public IssuedBookDto issueBook(IssueRequest request) {
        Long bookId = request.getBookId();
        Long studentId = request.getStudentId();

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        if (book.getAvailableCopies() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No copies available");
        }

        boolean alreadyIssued = issuedBookRepository.existsByBookAndStudentAndReturnedFalse(book, student);
        if (alreadyIssued) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book already issued to this student");
        }

        IssuedBook issue = IssuedBook.builder()
                .book(book)
                .student(student)
                .issueDate(LocalDate.now())
                .dueDate(LocalDate.now().plusDays(14)) // 2-week default period
                .returned(false)
                .build();

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);
        issuedBookRepository.save(issue);

        return toDto(issue);
    }

    @Override
    public IssuedBookDto returnBook(Long issuedBookId) {
        IssuedBook issuedBook = issuedBookRepository.findById(issuedBookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Issued book not found"));

        if (issuedBook.getReturned()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book already returned");
        }

        issuedBook.setReturned(true);
        issuedBook.setReturnDate(LocalDate.now());

        Book book = issuedBook.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);

        bookRepository.save(book);
        issuedBookRepository.save(issuedBook);

        return toDto(issuedBook);
    }

    @Override
    public List<IssuedBookDto> getIssuedBooksForStudent(String userEmail) {
        Student student = studentRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        return issuedBookRepository.findByStudent(student)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IssuedBookDto> getAllIssuedBooks() {
        return issuedBookRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private IssuedBookDto toDto(IssuedBook issuedBook) {
        IssuedBookDto dto = new IssuedBookDto();
        dto.setId(issuedBook.getId());
        dto.setBookTitle(issuedBook.getBook().getTitle());
        dto.setStudentName(issuedBook.getStudent().getName());
        dto.setIssueDate(issuedBook.getIssueDate());
        dto.setDueDate(issuedBook.getDueDate());
        dto.setReturned(issuedBook.getReturned());
        dto.setReturnDate(issuedBook.getReturnDate());
        return dto;
    }
}
