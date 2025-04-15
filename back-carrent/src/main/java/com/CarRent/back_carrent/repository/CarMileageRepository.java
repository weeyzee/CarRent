package com.CarRent.back_carrent.repository;

import com.CarRent.back_carrent.model.CarMileage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarMileageRepository extends JpaRepository<CarMileage, Long> {

    CarMileage findTopByCarCarIdOrderByTimeStampDesc(Long carId);
}
