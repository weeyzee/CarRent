package com.CarRent.back_carrent.mapper;

import com.CarRent.back_carrent.dto.BookingDto;
import com.CarRent.back_carrent.model.Booking;

public class BookingMapper {
    public static BookingDto toDto(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setBookingId(booking.getBookingId());
        dto.setCarId(booking.getCar().getCarId());
        dto.setCarModel(booking.getCar().getModel());
        dto.setUserId(booking.getUser().getUserId());
        dto.setUserName(booking.getUser().getName());
        dto.setStartTime(booking.getStartTime());
        dto.setEndTime(booking.getEndTime());
        dto.setStatus(booking.getStatus());
        return dto;
    }
}
