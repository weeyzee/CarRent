package com.CarRent.back_carrent.dto;

import lombok.Data;

@Data
public class CarDto {
    private Long carId;
    private String brand;
    private String model;
    private String licensePlate;
    private String status;
}
