package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicioCuenta {
        @Autowired
        private RepositorioCuenta repositoriocuenta;




    public boolean login(String correo, String contrasena) {
        Cuenta cuenta = repositoriocuenta.findByCorreo(correo);
        if (cuenta != null) {

        }
        return false;
    }
}



