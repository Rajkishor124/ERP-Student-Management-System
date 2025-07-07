package com.erp.studentmanagement.controller;

import com.erp.studentmanagement.dto.AttendanceDto;
import com.erp.studentmanagement.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    /**
     * ADMIN: Mark attendance for a student for today
     * Endpoint: POST /api/attendance/mark
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/mark")
    public ResponseEntity<AttendanceDto> markAttendance(
            @RequestParam Long studentId,
            @RequestParam String status
    ) {
        AttendanceDto dto = attendanceService.markAttendance(studentId, status);
        return ResponseEntity.ok(dto);
    }

    /**
     * STUDENT: View their own attendance records
     * Endpoint: GET /api/attendance/my
     */
    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/my")
    public ResponseEntity<List<AttendanceDto>> getMyAttendance(Authentication authentication) {
        String email = authentication.getName();
        List<AttendanceDto> attendanceList = attendanceService.getAttendanceForStudent(email);
        return ResponseEntity.ok(attendanceList);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/today")
    public ResponseEntity<List<AttendanceDto>> getTodayAttendance() {
        List<AttendanceDto> todayRecords = attendanceService.getTodayAttendance();
        return ResponseEntity.ok(todayRecords);
    }

}
