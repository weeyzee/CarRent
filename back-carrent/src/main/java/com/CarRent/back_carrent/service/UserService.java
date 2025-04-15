package com.CarRent.back_carrent.service;

import org.springframework.stereotype.Service;

import com.CarRent.back_carrent.dto.UserCreateDto;
import com.CarRent.back_carrent.mapper.UserMapper;
import com.CarRent.back_carrent.model.User;
import com.CarRent.back_carrent.repository.UserRepository;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> updateUser(Long id, UserCreateDto dto) {
        return userRepository.findById(id).map(user -> {
            UserMapper.updateEntity(user, dto);
            return userRepository.save(user);
        });
    }


    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
