package com.CarRent.back_carrent.dto;

import lombok.Data;

@Data
public class TripResponseDTO {
    private Long tripId;
    private Long bookingId;
    private Double distance;
    private Double price;
    private Boolean completed;
    private String startLocation;
    private String endLocation;
}
