package com.CarRent.back_carrent.mapper;

import com.CarRent.back_carrent.dto.UserDto;
import com.CarRent.back_carrent.dto.UserCreateDto;
import com.CarRent.back_carrent.model.User;

public class UserMapper {

    public static UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setUserId(user.getUserId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setLicenseNum(user.getLicenseNum());
        dto.setRegistrationDate(user.getRegistrationDate());
        dto.setRole(user.getRole());
        return dto;
    }

    public static User toEntity(UserCreateDto dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setLicenseNum(dto.getLicenseNum());
        user.setPassword(dto.getPassword());
        user.setRole("USER");
        return user;
    }

    public static void updateEntity(User user, UserCreateDto dto) {
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setLicenseNum(dto.getLicenseNum());
    }
}
