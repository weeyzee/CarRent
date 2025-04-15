package com.CarRent.back_carrent.repository;

import com.CarRent.back_carrent.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
