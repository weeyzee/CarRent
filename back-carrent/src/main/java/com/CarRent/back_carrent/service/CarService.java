package com.CarRent.back_carrent.service;

import org.springframework.stereotype.Service;

import com.CarRent.back_carrent.dto.CarCreateDto;
import com.CarRent.back_carrent.mapper.CarMapper;
import com.CarRent.back_carrent.model.Car;
import com.CarRent.back_carrent.repository.CarRepository;
import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }

    public Car createCar(Car car) {
        return carRepository.save(car);
    }

    public Optional<Car> updateCar(Long id, CarCreateDto dto) {
    return carRepository.findById(id).map(car -> {
        CarMapper.updateEntity(car, dto);
        return carRepository.save(car);
    });
}

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
}
