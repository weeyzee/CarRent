package com.CarRent.back_carrent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarMileageDto {

    private Long id;
    private Long carId;
    private Integer mileage;
    private Timestamp timeStamp;
}
