package com.CarRent.back_carrent.dto;

import lombok.Data;

@Data
public class PaymentRequestDTO {
    private Long tripId;
    private Double amount;
    private String paymentMethod;
}
