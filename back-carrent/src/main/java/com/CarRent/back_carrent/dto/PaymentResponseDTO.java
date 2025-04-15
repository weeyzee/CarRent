package com.CarRent.back_carrent.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PaymentResponseDTO {
    private Long paymentId;
    private Long tripId;
    private Double amount;
    private String paymentMethod;
    private LocalDateTime paymentDate;
}
