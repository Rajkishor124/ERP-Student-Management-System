package com.erp.studentmanagement.service;

import com.erp.studentmanagement.dto.AttendanceDto;
import com.erp.studentmanagement.entity.Attendance;
import com.erp.studentmanagement.entity.Student;
import com.erp.studentmanagement.entity.User;
import com.erp.studentmanagement.repository.AttendanceRepository;
import com.erp.studentmanagement.repository.StudentRepository;
import com.erp.studentmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    // Admin: Mark attendance for a student
    public AttendanceDto markAttendance(Long studentId, String status) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        Attendance existing = attendanceRepository.findByStudentAndDate(student, LocalDate.now());
        if (existing != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Attendance already marked for today");
        }

        boolean isPresent = "PRESENT".equalsIgnoreCase(status);

        Attendance attendance = Attendance.builder()
                .student(student)
                .date(LocalDate.now())
                .present(isPresent)
                .build();

        Attendance saved = attendanceRepository.save(attendance);
        return toDto(saved);
    }

    // Student: Get logged-in student attendance
    public List<AttendanceDto> getAttendanceForStudent(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Student student = studentRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<Attendance> records = attendanceRepository.findByStudent(student);
        return records.stream().map(this::toDto).collect(Collectors.toList());
    }

    // Admin: Get attendance for today (all students)
    public List<AttendanceDto> getTodayAttendance() {
        return attendanceRepository.findByDate(LocalDate.now())
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public AttendanceDto toDto(Attendance attendance) {
        return AttendanceDto.builder()
                .id(attendance.getId())
                .studentId(attendance.getStudent().getId())
                .studentName(attendance.getStudent().getName())
                .date(attendance.getDate())
                .status(attendance.getPresent() ? "PRESENT" : "ABSENT")
                .build();
    }
}
