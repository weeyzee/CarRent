package com.CarRent.back_carrent.repository;

import com.CarRent.back_carrent.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trip, Long> {
}
