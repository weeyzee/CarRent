package com.CarRent.back_carrent.mapper;

import com.CarRent.back_carrent.dto.CarDto;
import com.CarRent.back_carrent.dto.CarCreateDto;
import com.CarRent.back_carrent.model.Car;

public class CarMapper {

    public static CarDto toDto(Car car) {
        CarDto dto = new CarDto();
        dto.setCarId(car.getCarId());
        dto.setBrand(car.getBrand());
        dto.setModel(car.getModel());
        dto.setLicensePlate(car.getLicensePlate());
        dto.setStatus(car.getStatus());
        return dto;
    }

    public static Car toEntity(CarCreateDto dto) {
        Car car = new Car();
        car.setBrand(dto.getBrand());
        car.setModel(dto.getModel());
        car.setLicensePlate(dto.getLicensePlate());
        car.setStatus(dto.getStatus());
        return car;
    }

    public static void updateEntity(Car car, CarCreateDto dto) {
        car.setBrand(dto.getBrand());
        car.setModel(dto.getModel());
        car.setLicensePlate(dto.getLicensePlate());
        car.setStatus(dto.getStatus());
    }
}
