package com.CarRent.back_carrent.controller;

import com.CarRent.back_carrent.dto.BookingDto;
import com.CarRent.back_carrent.dto.BookingCreateDto;
import com.CarRent.back_carrent.mapper.BookingMapper;
import com.CarRent.back_carrent.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public List<BookingDto> getAllBookings() {
        return bookingService.getAllBookings().stream()
                .map(BookingMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(BookingMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BookingDto> createBooking(@RequestBody BookingCreateDto dto) {
        return bookingService.createBooking(dto)
                .map(BookingMapper::toDto)
                .map(saved -> ResponseEntity.status(201).body(saved))
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingDto> updateBooking(@PathVariable Long id, @RequestBody BookingCreateDto dto) {
        return bookingService.updateBooking(id, dto)
                .map(BookingMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok().build();
    }
}
