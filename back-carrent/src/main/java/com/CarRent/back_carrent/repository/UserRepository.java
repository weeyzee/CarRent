package com.CarRent.back_carrent.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.CarRent.back_carrent.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
