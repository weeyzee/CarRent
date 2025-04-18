package com.CarRent.back_carrent.dto;

import com.CarRent.back_carrent.model.Trip;

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

    public TripResponseDTO() {}

    public TripResponseDTO(Trip trip) {
        this.tripId = trip.getTripId();
        this.startLocation = trip.getStartLocation();
        this.endLocation = trip.getEndLocation();
        this.distance = trip.getDistance();
        this.price = trip.getPrice();
        this.completed = trip.getCompleted();
    }
}
