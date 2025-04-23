package com.CarRent.back_carrent.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "12345";
        String hashedPassword = encoder.encode(rawPassword);
        System.out.println(hashedPassword);
    }
}