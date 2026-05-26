package com.seveneleven.platform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.seveneleven.platform.security.JwtAuthenticationFilter;
import com.seveneleven.platform.security.CustomUserDetailsService;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http,
			JwtAuthenticationFilter jwtAuthenticationFilter,
			AuthenticationManager authenticationManager) throws Exception {

		http
				.csrf(csrf -> csrf.disable())
				.sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationManager(authenticationManager) // Explicitly bind our warning-free authentication context
				.authorizeHttpRequests(auth -> auth
						// Public Endpoints & API Documentation
						.requestMatchers("/api/auth/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

						// User Endpoints
						.requestMatchers("/api/users/**").hasRole("ADMIN")

						// Bulk CSV Upload Endpoints
						.requestMatchers("/api/uploads/users").hasRole("ADMIN")
						.requestMatchers("/api/uploads/**").hasAnyRole("ADMIN", "MANAGER")

						// Project Endpoints
						.requestMatchers(HttpMethod.GET, "/api/projects/**").authenticated()
						.requestMatchers(HttpMethod.POST, "/api/projects/**").hasAnyRole("ADMIN", "MANAGER")
						.requestMatchers(HttpMethod.PUT, "/api/projects/**").hasAnyRole("ADMIN", "MANAGER")
						.requestMatchers(HttpMethod.DELETE, "/api/projects/**").hasRole("ADMIN")

						// Sprint Endpoints
						.requestMatchers(HttpMethod.GET, "/api/sprints/**").authenticated()
						.requestMatchers(HttpMethod.POST, "/api/sprints/**").hasAnyRole("ADMIN", "MANAGER")
						.requestMatchers(HttpMethod.PUT, "/api/sprints/**").hasAnyRole("ADMIN", "MANAGER")

						// Task Endpoints
						.requestMatchers(HttpMethod.GET, "/api/tasks/**").authenticated()
						.requestMatchers(HttpMethod.POST, "/api/tasks/**").hasAnyRole("ADMIN", "MANAGER")
						.requestMatchers(HttpMethod.PUT, "/api/tasks/**").hasAnyRole("ADMIN", "MANAGER", "DEVELOPER")
						.requestMatchers(HttpMethod.DELETE, "/api/tasks/**").hasAnyRole("ADMIN", "MANAGER")

						// Resource Allocation Endpoints
						.requestMatchers(HttpMethod.GET, "/api/resources/**").authenticated()
						.requestMatchers(HttpMethod.POST, "/api/resources/**").hasAnyRole("ADMIN", "MANAGER")
						.requestMatchers(HttpMethod.PUT, "/api/resources/**").hasAnyRole("ADMIN", "MANAGER")

						// Feedback Endpoints
						.requestMatchers(HttpMethod.GET, "/api/feedback/**").authenticated()
						.requestMatchers(HttpMethod.POST, "/api/feedback/**").hasAnyRole("ADMIN", "MANAGER")

						// ML Engine Prediction Gateway
						.requestMatchers("/api/predict/**").authenticated()

						// Fallback rule
						.anyRequest().authenticated())
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(CustomUserDetailsService userDetailsService,
			PasswordEncoder passwordEncoder) {
		// Instantiating DaoAuthenticationProvider inside this scope prevents Spring Boot
		// from creating duplicate resolution bindings, silencing log warnings entirely.
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(passwordEncoder);
		return new ProviderManager(List.of(provider));
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
