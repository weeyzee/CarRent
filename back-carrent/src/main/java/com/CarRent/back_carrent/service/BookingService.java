package com.CarRent.back_carrent.service;

import com.CarRent.back_carrent.dto.BookingCreateDto;
import com.CarRent.back_carrent.model.Booking;
import com.CarRent.back_carrent.model.Car;
import com.CarRent.back_carrent.model.User;
import com.CarRent.back_carrent.repository.BookingRepository;
import com.CarRent.back_carrent.repository.CarRepository;
import com.CarRent.back_carrent.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, CarRepository carRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.carRepository = carRepository;
        this.userRepository = userRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public Optional<Booking> createBooking(BookingCreateDto dto) {
        Optional<Car> carOpt = carRepository.findById(dto.getCarId());
        Optional<User> userOpt = userRepository.findById(dto.getUserId());

        if (carOpt.isEmpty() || userOpt.isEmpty()) {
            return Optional.empty();
        }

        Booking booking = new Booking();
        booking.setCar(carOpt.get());
        booking.setUser(userOpt.get());
        booking.setStartTime(dto.getStartTime());
        booking.setEndTime(dto.getEndTime());
        booking.setStatus(dto.getStatus());

        return Optional.of(bookingRepository.save(booking));
    }

    public Optional<Booking> updateBooking(Long id, BookingCreateDto dto) {
        return bookingRepository.findById(id).flatMap(existing -> {
            Optional<Car> carOpt = carRepository.findById(dto.getCarId());
            Optional<User> userOpt = userRepository.findById(dto.getUserId());

            if (carOpt.isEmpty() || userOpt.isEmpty()) return Optional.empty();

            existing.setCar(carOpt.get());
            existing.setUser(userOpt.get());
            existing.setStartTime(dto.getStartTime());
            existing.setEndTime(dto.getEndTime());
            existing.setStatus(dto.getStatus());

            return Optional.of(bookingRepository.save(existing));
        });
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
