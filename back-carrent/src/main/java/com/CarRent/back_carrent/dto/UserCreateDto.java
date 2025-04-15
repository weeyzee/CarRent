package com.CarRent.back_carrent.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class UserCreateDto {

    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    private String phoneNumber;

    private String licenseNum;

    @NotBlank
    private String password;
}

