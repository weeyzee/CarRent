package com.CarRent.back_carrent.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "booking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Timestamp startTime;

    private Timestamp endTime;

    private String status;  // Статус бронирования (например, "Pending", "Completed", "Cancelled")

    public Car getCar() {
        return car;
    }

    public User getUser() {
        return user;
    }

    public Long getCarId() {
        return car != null ? car.getCarId() : null;
    }

    public Long getUserId() {
        return user != null ? user.getUserId() : null;
    }
}
