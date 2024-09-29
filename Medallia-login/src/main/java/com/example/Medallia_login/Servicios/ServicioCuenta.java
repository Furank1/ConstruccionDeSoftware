package com.example.Medallia_login.Servicios;

import com.example.Medallia_login.Models.Cuenta;
import com.example.Medallia_login.Repositorios.RepositorioCuentas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ServicioCuenta {

    @Autowired
    private RepositorioCuentas cuentaRepository;

    @Autowired
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Cuenta registrar(String email, String password) {
        Cuenta cuenta = new Cuenta(email, password);
        cuenta.setEmail(email);
        cuenta.setPassword(passwordEncoder.encode(password));


        // Guardar cuenta en el repositorio (base de datos)
        return cuentaRepository.save(cuenta);
    }

    public Optional<Cuenta> login(String email, String password) {
        // Buscar la cuenta por correo
        Optional<Cuenta> cuentaOpt = cuentaRepository.findByEmail(email);

        // Validar si la cuenta existe y si la contraseña coincide
        if (cuentaOpt.isPresent() && passwordEncoder.matches(password, cuentaOpt.get().getPassword())) {
            return cuentaOpt;
        }
        return Optional.empty();
    }
}
