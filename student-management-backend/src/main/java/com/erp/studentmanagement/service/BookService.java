package com.erp.studentmanagement.service;

import com.erp.studentmanagement.dto.BookDto;

import java.util.List;

public interface BookService {
    BookDto addBook(BookDto bookDto);
    List<BookDto> getAllBooks();
    BookDto getBookById(Long id);
    void deleteBook(Long id);
    BookDto updateBook(Long id, BookDto bookDto);
}
