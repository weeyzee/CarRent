package com.CarRent.back_carrent.dto;
import java.sql.Timestamp;

import lombok.Data;

@Data
public class UserDto {
    private Long userId;
    private String name;
    private String email;
    private String phoneNumber;
    private String licenseNum;
    private Timestamp  registrationDate;
}
