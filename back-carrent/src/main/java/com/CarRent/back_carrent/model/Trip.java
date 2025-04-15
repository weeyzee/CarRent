package com.CarRent.back_carrent.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trip")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tripId;

    @OneToOne
    @JoinColumn(name = "booking_id", unique = true)
    private Booking booking;

    private Double distance;

    private Double price;

    private Boolean completed = false;

    private String startLocation;
    private String endLocation;
}
