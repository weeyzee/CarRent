package com.CarRent.back_carrent.service;

import com.CarRent.back_carrent.dto.TripRequestDTO;
import com.CarRent.back_carrent.dto.TripResponseDTO;
import com.CarRent.back_carrent.mapper.TripMapper;
import com.CarRent.back_carrent.model.Booking;
import com.CarRent.back_carrent.model.Car;
import com.CarRent.back_carrent.model.Trip;
import com.CarRent.back_carrent.repository.BookingRepository;
import com.CarRent.back_carrent.repository.CarRepository;
import com.CarRent.back_carrent.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final BookingRepository bookingRepository;
    private final TripMapper tripMapper;
    private final CarRepository carRepository;

    public TripService(TripRepository tripRepository, BookingRepository bookingRepository, TripMapper tripMapper, CarRepository carRepository) {
        this.carRepository = carRepository;
        this.tripRepository = tripRepository;
        this.bookingRepository = bookingRepository;
        this.tripMapper = tripMapper;
    }

    public List<TripResponseDTO> getAllTrips() {
        return tripRepository.findAll().stream().map(tripMapper::toDto).toList();
    }

    public List<Trip> getTripsByUserId(Long userId) {
        return tripRepository.findAllByUserId(userId);
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

    public Optional<TripResponseDTO> updateTrip(Long id, TripRequestDTO dto) {
        Optional<Trip> tripOptional = tripRepository.findById(id);

        if (tripOptional.isPresent()) {
            Trip trip = tripOptional.get();

            // Обновляем поля
            if (dto.getStartLocation() != null) {
                trip.setStartLocation(dto.getStartLocation());
            }
            if (dto.getEndLocation() != null) {
                trip.setEndLocation(dto.getEndLocation());
            }
            if (dto.getDistance() != null) {
                trip.setDistance(dto.getDistance());
            }
            if (dto.getPrice() != null) {
                trip.setPrice(dto.getPrice());
            }

            // Логика завершения поездки и освобождения машины
            if (dto.getCompleted() != null) {
                trip.setCompleted(dto.getCompleted());

                if (dto.getCompleted()) {
                    // ✅ Освобождаем машину
                    Car car = trip.getBooking().getCar();
                    car.setStatus("Available");
                    // 💡 Обновим машину в базе
                    // bookingRepository.save(trip.getBooking()); // только если Booking обновляется
                    // ⬇️ Лучше будет внедрить carRepository:
                    carRepository.save(car);
                }
            } else {
                trip.setCompleted(false);
            }

            tripRepository.save(trip);
            return Optional.of(new TripResponseDTO(trip));
        }

        return Optional.empty();
    }
    
    public boolean deleteTrip(Long id) {
        if (tripRepository.existsById(id)) {
            tripRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
