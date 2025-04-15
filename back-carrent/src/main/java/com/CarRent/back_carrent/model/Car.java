package com.CarRent.back_carrent.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "car")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;

    private String brand;
    private String model;

    @Column(nullable = false, unique = true)
    private String licensePlate;

    private String status;
}
