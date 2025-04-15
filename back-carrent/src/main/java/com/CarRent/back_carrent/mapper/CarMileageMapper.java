package com.CarRent.back_carrent.mapper;

import com.CarRent.back_carrent.dto.CarMileageDto;
import com.CarRent.back_carrent.model.Car;
import com.CarRent.back_carrent.model.CarMileage;
import org.springframework.stereotype.Component;

@Component
public class CarMileageMapper {

    public CarMileageDto toDto(CarMileage carMileage) {
        return new CarMileageDto(
                carMileage.getId(),
                carMileage.getCar().getCarId(),
                carMileage.getMileage(),
                carMileage.getTimeStamp()
        );
    }

    public CarMileage toEntity(CarMileageDto carMileageDto, Car car) {
        return new CarMileage(
                carMileageDto.getId(),
                car,
                carMileageDto.getMileage(),
                carMileageDto.getTimeStamp()
        );
    }
}
