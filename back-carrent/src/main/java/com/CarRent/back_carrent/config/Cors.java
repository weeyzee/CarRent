package com.CarRent.back_carrent.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Cors {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Можно сузить до /projects/**
                        .allowedOrigins("http://localhost:4200") // Разрешить фронту
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Разрешённые методы
                        .allowedHeaders("*");
            }
        };
    }
}
