package com.example.Medallia_login.Repositorios;


import com.example.Medallia_login.Models.Cuenta;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RepositorioCuentas extends MongoRepository<Cuenta, String> {
    Optional<Cuenta> findByEmail(String email);
}
