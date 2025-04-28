package com.CarRent.back_carrent.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final SecretKey SECRET_KEY;

    public JwtService(@Value("${jwt.secret}") String secret) {
        this.SECRET_KEY = new SecretKeySpec(secret.getBytes(), SignatureAlgorithm.HS256.getJcaName());
    }

    //ппц
    //public String generateToken(com.CarRent.back_carrent.model.User user) {
    //     Map<String, Object> claims = new HashMap<>();
    //     claims.put("userId", user.getUserId());
    //     claims.put("role", user.getRole());
    //     return createToken(claims, user.getName()); 
    // }
    // public Date extractExpiration(String token) {
    //     return extractClaim(token, Claims::getExpiration);
    // }
    // private String createToken(Map<String, Object> claims, String username) {
    //     return Jwts.builder()
    //             .setClaims(claims)
    //             .setSubject(username)
    //             .setIssuedAt(new Date(System.currentTimeMillis()))
    //             .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 чосов
    //             .signWith(SECRET_KEY)
    //             .compact();
    // }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false; 
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
    }

    public Authentication getAuthentication(String token) {
        String username = extractClaim(token, Claims::getSubject);
        return new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
    }

    public String generateTokenForUser(com.CarRent.back_carrent.model.User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getUserId());
        claims.put("role", user.getRole());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SECRET_KEY) 
                .compact();
    }
}
