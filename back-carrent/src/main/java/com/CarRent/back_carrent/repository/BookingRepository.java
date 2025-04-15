package com.CarRent.back_carrent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.CarRent.back_carrent.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Здесь можно добавлять методы для фильтрации бронирований, если нужно
}
