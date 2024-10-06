package com.example.Medallia_login.Controller;

import com.example.Medallia_login.Dominio.CuentaDTO;
import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import com.example.Medallia_login.Servicio.ServicioCuenta;
import org.bson.io.BsonOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping ("/api/auth")
public class ControladorCuenta {
    @Autowired
    private ServicioCuenta servicioCuenta;

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody CuentaDTO loginRequest) {
        boolean success = servicioCuenta.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (success) {
            System.out.println("OPA");
            return ResponseEntity.ok("{\"mensaje\": \"Login exitoso\"}");
        } else {
            System.out.println("NO OPA");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"mensaje\": \"Credenciales incorrectas\"}");
        }
    }


}