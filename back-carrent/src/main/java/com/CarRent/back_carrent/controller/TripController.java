package com.CarRent.back_carrent.controller;

import com.CarRent.back_carrent.dto.TripRequestDTO;
import com.CarRent.back_carrent.dto.TripResponseDTO;
import com.CarRent.back_carrent.service.TripService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trips")
@CrossOrigin(origins = "http://localhost:4200")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public List<TripResponseDTO> getAllTrips() {
        return tripService.getAllTrips();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripResponseDTO> getTripById(@PathVariable Long id) {
        return tripService.getTripById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TripResponseDTO> createTrip(@RequestBody TripRequestDTO dto) {
        return tripService.createTrip(dto)
                .map(savedTrip -> ResponseEntity.status(201).body(savedTrip))
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TripResponseDTO> updateTrip(@PathVariable Long id, @RequestBody TripRequestDTO dto) {
        return tripService.updateTrip(id, dto)
                .map(updatedTrip -> ResponseEntity.ok(updatedTrip))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
        return tripService.deleteTrip(id)
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }    
}
