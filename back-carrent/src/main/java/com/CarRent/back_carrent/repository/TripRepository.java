package com.CarRent.back_carrent.repository;

import com.CarRent.back_carrent.model.Trip;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TripRepository extends JpaRepository<Trip, Long> {

    @Query(value = """
        SELECT t.* FROM trip t
        JOIN booking b ON t.booking_id = b.booking_id
        WHERE b.user_id = :userId
    """, nativeQuery = true)
    List<Trip> findAllByUserId(@Param("userId") Long userId);
    
}
