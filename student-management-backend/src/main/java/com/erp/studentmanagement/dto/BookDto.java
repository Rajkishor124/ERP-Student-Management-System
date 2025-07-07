package com.erp.studentmanagement.dto;

import lombok.Data;

@Data
public class BookDto {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private int totalCopies;
    private int availableCopies;
    private String category;
    private String publisher;
}
