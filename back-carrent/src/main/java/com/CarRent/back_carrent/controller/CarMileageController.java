package com.CarRent.back_carrent.controller;

import com.CarRent.back_carrent.dto.CarMileageDto;
import com.CarRent.back_carrent.mapper.CarMileageMapper;
import com.CarRent.back_carrent.model.Car;
import com.CarRent.back_carrent.model.CarMileage;
import com.CarRent.back_carrent.service.CarMileageService;
import com.CarRent.back_carrent.service.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mileage")
@CrossOrigin(origins = "http://localhost:4200")
public class CarMileageController {

    private final CarMileageService carMileageService;
    private final CarMileageMapper carMileageMapper;
    private final CarService carService;

    public CarMileageController(CarMileageService carMileageService, CarMileageMapper carMileageMapper, CarService carService) {
        this.carMileageService = carMileageService;
        this.carMileageMapper = carMileageMapper;
        this.carService = carService;
    }

    @PostMapping
    public ResponseEntity<CarMileageDto> addCarMileage(@RequestBody CarMileageDto carMileageDto) {
        Car car = carService.getCarById(carMileageDto.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found"));

        CarMileage carMileage = carMileageMapper.toEntity(carMileageDto, car);
        CarMileage savedCarMileage = carMileageService.addCarMileage(carMileage);

        return ResponseEntity.status(201).body(carMileageMapper.toDto(savedCarMileage));
    }

    @GetMapping("/car/{carId}")
    public ResponseEntity<CarMileageDto> getLastCarMileage(@PathVariable Long carId) {
        CarMileage lastMileage = carMileageService.getLastCarMileage(carId);
        if (lastMileage == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(carMileageMapper.toDto(lastMileage));
    }
}

