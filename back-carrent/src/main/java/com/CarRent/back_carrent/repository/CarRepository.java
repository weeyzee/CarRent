package com.CarRent.back_carrent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.CarRent.back_carrent.model.Car;

public interface CarRepository extends JpaRepository<Car, Long> {
    
}
