package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicioCuenta {
        @Autowired
        private RepositorioCuenta repositoriocuenta;

    public boolean login(String email, String password) {
        Cuenta cuenta = repositoriocuenta.findByEmail(email);
        if (cuenta != null) {
            return password.equals(cuenta.getPassword());
        }
        return false;
    }


}



