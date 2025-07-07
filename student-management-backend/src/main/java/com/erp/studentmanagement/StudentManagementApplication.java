package com.erp.studentmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class StudentManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentManagementApplication.class, args);
	}

	@Bean
	public CommandLineRunner run(PasswordEncoder passwordEncoder) {
		return args -> {
			String rawPassword = "123456";
			String encodedPassword = passwordEncoder.encode(rawPassword);
			System.out.println("Encoded password for '123456': " + encodedPassword);
		};
	}
}
