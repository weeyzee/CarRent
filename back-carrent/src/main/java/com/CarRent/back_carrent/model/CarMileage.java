package com.CarRent.back_carrent.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "carmileage")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarMileage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    private Integer mileage;  // Пройденный путь в километрах

    @Column(nullable = false)
    private Timestamp timeStamp = new Timestamp(System.currentTimeMillis());  // Время, когда обновился пробег
}
