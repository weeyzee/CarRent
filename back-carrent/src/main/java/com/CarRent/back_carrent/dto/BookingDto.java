package com.CarRent.back_carrent.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class BookingDto {
    private Long bookingId;
    private Long carId;
    private String carModel;
    private Long userId;
    private String userName;
    private Timestamp startTime;
    private Timestamp endTime;
    private String status;
}
