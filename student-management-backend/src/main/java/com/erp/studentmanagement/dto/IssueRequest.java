package com.erp.studentmanagement.dto;

import lombok.Data;

@Data
public class IssueRequest {
    private Long bookId;
    private Long studentId;
}
