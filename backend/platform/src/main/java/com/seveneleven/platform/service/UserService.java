package com.seveneleven.platform.service;

import com.seveneleven.platform.entity.User;
import com.seveneleven.platform.repository.UserRepository;
import com.seveneleven.platform.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public String registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }
        // Securely hash the plain-text password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully!";
    }

    public Map<String, Object> loginUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            User user = userOpt.get();
            String token = jwtUtils.generateToken(user.getEmail(), user.getOriginalRole());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("id", user.getId());
            response.put("name", user.getName());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());
            return response;
        }
        throw new RuntimeException("Invalid email or password context");
    }
}