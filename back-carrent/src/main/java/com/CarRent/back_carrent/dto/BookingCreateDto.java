package com.CarRent.back_carrent.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class BookingCreateDto {
    private Long carId;
    private Long userId;
    private Timestamp startTime;
    private Timestamp endTime;
    private String status;
}
