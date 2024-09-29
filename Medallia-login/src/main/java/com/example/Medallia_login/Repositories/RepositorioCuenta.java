package com.example.Medallia_login.Repositories;
import com.example.Medallia_login.Modelos.Cuenta;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioCuenta extends MongoRepository<Cuenta,String> {

    Cuenta findByCorreo(String correo);
}

