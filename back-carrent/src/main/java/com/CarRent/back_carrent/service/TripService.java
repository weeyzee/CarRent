package com.CarRent.back_carrent.service;

import com.CarRent.back_carrent.dto.TripRequestDTO;
import com.CarRent.back_carrent.dto.TripResponseDTO;
import com.CarRent.back_carrent.mapper.TripMapper;
import com.CarRent.back_carrent.model.Booking;
import com.CarRent.back_carrent.model.Trip;
import com.CarRent.back_carrent.repository.BookingRepository;
import com.CarRent.back_carrent.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final BookingRepository bookingRepository;
    private final TripMapper tripMapper;

    public TripService(TripRepository tripRepository, BookingRepository bookingRepository, TripMapper tripMapper) {
        this.tripRepository = tripRepository;
        this.bookingRepository = bookingRepository;
        this.tripMapper = tripMapper;
    }

    public List<TripResponseDTO> getAllTrips() {
        return tripRepository.findAll().stream().map(tripMapper::toDto).toList();
    }

    public Optional<TripResponseDTO> getTripById(Long id) {
        return tripRepository.findById(id).map(tripMapper::toDto);
    }

    public Optional<TripResponseDTO> createTrip(TripRequestDTO dto) {
        Optional<Booking> bookingOpt = bookingRepository.findById(dto.getBookingId());
        if (bookingOpt.isEmpty()) return Optional.empty();

        Trip trip = new Trip();
        trip.setBooking(bookingOpt.get());
        trip.setDistance(dto.getDistance());
        trip.setPrice(dto.getPrice());
        trip.setCompleted(dto.getCompleted());
        trip.setStartLocation(dto.getStartLocation());
        trip.setEndLocation(dto.getEndLocation());

        return Optional.of(tripMapper.toDto(tripRepository.save(trip)));
    }

    public boolean deleteTrip(Long id) {
        if (tripRepository.existsById(id)) {
            tripRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
