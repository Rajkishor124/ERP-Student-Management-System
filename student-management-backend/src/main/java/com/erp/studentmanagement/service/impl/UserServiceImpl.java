package com.erp.studentmanagement.service.impl;

import com.erp.studentmanagement.dto.AuthResponse;
import com.erp.studentmanagement.dto.UserLoginRequest;
import com.erp.studentmanagement.entity.User;
import com.erp.studentmanagement.repository.UserRepository;
import com.erp.studentmanagement.security.JwtUtil;
import com.erp.studentmanagement.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponse login(UserLoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token);
    }
}
