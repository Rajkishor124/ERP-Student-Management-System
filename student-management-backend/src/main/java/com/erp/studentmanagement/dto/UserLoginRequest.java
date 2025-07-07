package com.erp.studentmanagement.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserLoginRequest {

    @Email(message = "Enter a valid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
}
