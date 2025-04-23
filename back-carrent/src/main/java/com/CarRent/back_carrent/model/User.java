package com.CarRent.back_carrent.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;

    @Column(nullable = false, unique = true)
    @Email(message = "Invalid email format")
    private String email;

    @Column(unique = true)
    @NotNull(message = "Phone number cannot be null") // Добавляем валидацию
    private String phoneNumber;

    @Column(unique = true)
    private String licenseNum;

    @Column(nullable = false)
    private String password;

    private Timestamp registrationDate = new Timestamp(System.currentTimeMillis());


}
