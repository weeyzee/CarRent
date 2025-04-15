package com.CarRent.back_carrent.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CarCreateDto {

    @NotBlank
    private String brand;

    @NotBlank
    private String model;

    @NotBlank
    private String licensePlate;

    private String status;
}
