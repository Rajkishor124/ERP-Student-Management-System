package com.erp.studentmanagement.dto;

import lombok.Data;

@Data
public class CreateBookRequest {
    private String title;
    private String author;
    private String isbn;
    private int totalCopies;
    private String category;
    private String publisher;
}
