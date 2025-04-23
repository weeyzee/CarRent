package com.CarRent.back_carrent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.CarRent.back_carrent.model.Car;

public interface CarRepository extends JpaRepository<Car, Long> {
    Optional<Car> findFirstByBrandAndStatus(String brand, String status);
}
