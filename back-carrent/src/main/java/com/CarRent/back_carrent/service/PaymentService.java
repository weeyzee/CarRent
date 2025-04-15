package com.CarRent.back_carrent.service;

import com.CarRent.back_carrent.dto.PaymentRequestDTO;
import com.CarRent.back_carrent.dto.PaymentResponseDTO;
import com.CarRent.back_carrent.mapper.PaymentMapper;
import com.CarRent.back_carrent.model.Payment;
import com.CarRent.back_carrent.model.Trip;
import com.CarRent.back_carrent.repository.PaymentRepository;
import com.CarRent.back_carrent.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final TripRepository tripRepository;
    private final PaymentMapper paymentMapper;

    public PaymentService(PaymentRepository paymentRepository, TripRepository tripRepository, PaymentMapper paymentMapper) {
        this.paymentRepository = paymentRepository;
        this.tripRepository = tripRepository;
        this.paymentMapper = paymentMapper;
    }

    public List<PaymentResponseDTO> getAllPayments() {
        return paymentRepository.findAll().stream().map(paymentMapper::toDto).toList();
    }

    public Optional<PaymentResponseDTO> getPaymentById(Long id) {
        return paymentRepository.findById(id).map(paymentMapper::toDto);
    }

    public Optional<PaymentResponseDTO> createPayment(PaymentRequestDTO dto) {
        Optional<Trip> tripOpt = tripRepository.findById(dto.getTripId());
        if (tripOpt.isEmpty()) return Optional.empty();

        Payment payment = new Payment();
        payment.setTrip(tripOpt.get());
        payment.setAmount(dto.getAmount());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setPaymentDate(LocalDateTime.now());

        return Optional.of(paymentMapper.toDto(paymentRepository.save(payment)));
    }

    public boolean deletePayment(Long id) {
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
