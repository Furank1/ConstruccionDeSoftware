package com.example.Controller;

import com.example.Domain.CuentaUsuarioDTO;
import com.example.Servicio.ServicioC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class Controlador {

    @Autowired
    private ServicioC servicioCuenta;
    @CrossOrigin("*")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody CuentaUsuarioDTO loginRequest) {
        int success = servicioCuenta.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (success == 1) {
            return ResponseEntity.ok("Login exitoso");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }
}
