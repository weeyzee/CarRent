package com.CarRent.back_carrent.service;

import com.CarRent.back_carrent.model.CarMileage;
import com.CarRent.back_carrent.repository.CarMileageRepository;
import org.springframework.stereotype.Service;

@Service
public class CarMileageService {

    private final CarMileageRepository carMileageRepository;

    public CarMileageService(CarMileageRepository carMileageRepository) {
        this.carMileageRepository = carMileageRepository;
    }

    public CarMileage addCarMileage(CarMileage carMileage) {
        return carMileageRepository.save(carMileage);
    }

    public CarMileage getLastCarMileage(Long carId) {
        return carMileageRepository.findTopByCarCarIdOrderByTimeStampDesc(carId);
    }
}
