// package com.CarRent.back_carrent.service;

// import com.CarRent.back_carrent.model.User;
// import com.CarRent.back_carrent.repository.UserRepository;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// @Service
// public class CustomUserDetailsService implements UserDetailsService {

//     private final UserRepository userRepository;

//     public CustomUserDetailsService(UserRepository userRepository) {
//         this.userRepository = userRepository;
//     }

//     @Override
//     public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//         User user = userRepository.findByEmail(email)
//                 .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

//         return org.springframework.security.core.userdetails.User
//                 .withUsername(user.getEmail())
//                 .password(user.getPassword())
//                 .roles("USER") 
//                 .build();
//     }
// }