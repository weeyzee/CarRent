package com.CarRent.back_carrent.mapper;

import com.CarRent.back_carrent.dto.PaymentResponseDTO;
import com.CarRent.back_carrent.model.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public PaymentResponseDTO toDto(Payment payment) {
        PaymentResponseDTO dto = new PaymentResponseDTO();
        dto.setPaymentId(payment.getPaymentId());
        dto.setTripId(payment.getTrip().getTripId());
        dto.setAmount(payment.getAmount());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setPaymentDate(payment.getPaymentDate());
        return dto;
    }
}
