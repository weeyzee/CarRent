package com.CarRent.back_carrent.controller;

import com.CarRent.back_carrent.model.Car;
import com.CarRent.back_carrent.service.CarService;
import com.CarRent.back_carrent.dto.CarDto;
import com.CarRent.back_carrent.dto.CarCreateDto;
import com.CarRent.back_carrent.mapper.CarMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    public List<CarDto> getAllCars() {
        return carService.getAllCars().stream()
                .map(CarMapper::toDto)
                .toList();
    }

    @GetMapping("/available")
    public ResponseEntity<CarDto> getAvailableCarByBrandQuery(@RequestParam String brand) {
        return carService.findFirstAvailableByBrand(brand)
                .map(CarMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long id) {
        return carService.getCarById(id)
                .map(CarMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CarDto> createCar(@RequestBody CarCreateDto carDto) {
        Car created = carService.createCar(CarMapper.toEntity(carDto));
        return ResponseEntity.status(201).body(CarMapper.toDto(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarDto> updateCar(@PathVariable Long id, @RequestBody CarCreateDto carDto) {
        return carService.updateCar(id, carDto)
                .map(CarMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.ok().build();
    }
}
