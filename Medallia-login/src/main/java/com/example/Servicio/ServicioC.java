package com.example.Servicio;

import com.example.Documentos.CuentaUsuario;
import com.example.Repositorio.RepositorioCuenta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicioC {

    @Autowired
    private RepositorioCuenta repositoriocuenta;

    // Cambiado para devolver un int
    public int login(String email, String password) {
        CuentaUsuario cuenta = repositoriocuenta.findByEmail(email);
        if (cuenta != null) {
            if (password.equals(cuenta.getPassword())) {
                return 1; // Login exitoso
            }
            return 0; // Contraseña incorrecta
        }
        return -1; // Usuario no encontrado
    }
}
