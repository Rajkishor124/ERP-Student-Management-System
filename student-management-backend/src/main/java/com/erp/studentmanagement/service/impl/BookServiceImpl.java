package com.erp.studentmanagement.service.impl;

import com.erp.studentmanagement.dto.BookDto;
import com.erp.studentmanagement.entity.Book;
import com.erp.studentmanagement.repository.BookRepository;
import com.erp.studentmanagement.repository.IssuedBookRepository;
import com.erp.studentmanagement.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final IssuedBookRepository issuedBookRepository;

    @Override
    public BookDto addBook(BookDto dto) {
        Book book = Book.builder()
                .title(dto.getTitle())
                .author(dto.getAuthor())
                .isbn(dto.getIsbn())
                .totalCopies(dto.getTotalCopies())
                .availableCopies(dto.getTotalCopies()) // Initially, all copies are available
                .category(dto.getCategory())
                .publisher(dto.getPublisher())
                .build();

        return toDto(bookRepository.save(book));
    }

    @Override
    public List<BookDto> getAllBooks() {
        return bookRepository.findByDeletedFalse()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public BookDto getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));
        return toDto(book);
    }

    @Override
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        boolean isCurrentlyIssued = issuedBookRepository.existsByBookAndReturnedFalse(book);
        if (isCurrentlyIssued) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Cannot delete: Book is currently issued to a student"
            );
        }

        book.setDeleted(true); // ✅ Soft delete
        bookRepository.save(book);
    }

    @Override
    public BookDto updateBook(Long id, BookDto dto) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setIsbn(dto.getIsbn());
        book.setCategory(dto.getCategory());
        book.setPublisher(dto.getPublisher());
        book.setTotalCopies(dto.getTotalCopies());

        // Optional: auto-correct available copies if needed
        if (dto.getAvailableCopies() <= dto.getTotalCopies()) {
            book.setAvailableCopies(dto.getAvailableCopies());
        }

        return toDto(bookRepository.save(book));
    }

    private BookDto toDto(Book book) {
        BookDto dto = new BookDto();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setIsbn(book.getIsbn());
        dto.setTotalCopies(book.getTotalCopies());
        dto.setAvailableCopies(book.getAvailableCopies());
        dto.setCategory(book.getCategory());
        dto.setPublisher(book.getPublisher());
        return dto;
    }
}
