package com.CarRent.back_carrent.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @OneToOne
    @JoinColumn(name = "trip_id", unique = true)
    private Trip trip;

    private Double amount;

    private String paymentMethod;

    private LocalDateTime paymentDate;
}
