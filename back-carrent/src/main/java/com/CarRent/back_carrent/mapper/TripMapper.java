package com.CarRent.back_carrent.mapper;

import com.CarRent.back_carrent.dto.TripRequestDTO;
import com.CarRent.back_carrent.dto.TripResponseDTO;
import com.CarRent.back_carrent.model.Trip;
import org.springframework.stereotype.Component;

@Component
public class TripMapper {

    public TripResponseDTO toDto(Trip trip) {
        TripResponseDTO dto = new TripResponseDTO();
        dto.setTripId(trip.getTripId());
        dto.setBookingId(trip.getBooking().getBookingId());
        dto.setDistance(trip.getDistance());
        dto.setPrice(trip.getPrice());
        dto.setCompleted(trip.getCompleted());
        dto.setStartLocation(trip.getStartLocation());
        dto.setEndLocation(trip.getEndLocation());
        return dto;
    }
}
