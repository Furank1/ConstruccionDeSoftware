package com.example.Medallia_login;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@SpringBootApplication
public class MedalliaLoginApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedalliaLoginApplication.class, args);
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.csrf(csrf -> csrf.disable()) // Desactiva CSRF para facilitar pruebas con Postman
				.authorizeHttpRequests((authz) -> authz
						.anyRequest().permitAll() // Permite todas las solicitudes sin autenticación
				);

		return http.build();
	}
}

