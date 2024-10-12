package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ServicioCuenta {
        @Autowired
        private RepositorioCuenta repositoriocuenta;

    public Optional<Cuenta> login(String email, String password) {
        Cuenta cuenta = repositoriocuenta.findByEmail(email);
        Optional <Cuenta> cuentaopt= Optional.ofNullable(cuenta);
        return cuentaopt;
    }


}



