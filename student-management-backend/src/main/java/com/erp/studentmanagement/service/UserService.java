package com.erp.studentmanagement.service;

import com.erp.studentmanagement.dto.*;

public interface UserService {
    AuthResponse login(UserLoginRequest request);
}
