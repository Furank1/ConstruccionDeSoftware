package com.example.Medallia_login.Repositories;
import com.example.Medallia_login.Modelos.Cuenta;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RepositorioCuenta extends MongoRepository<Cuenta,String> {
    Cuenta findByEmail(String correo);

    Optional<Cuenta> findById(String id);

    List<Cuenta> findAll();
}

