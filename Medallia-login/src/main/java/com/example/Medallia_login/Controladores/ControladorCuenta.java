package com.example.Medallia_login.Controladores;

import com.example.Medallia_login.Models.Cuenta;
import com.example.Medallia_login.Servicios.ServicioCuenta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/cuenta")
public class ControladorCuenta {

    @Autowired
    private ServicioCuenta cuentaService;

    @CrossOrigin(origins = "*")
    @PostMapping("/registrar")
    public ResponseEntity<Cuenta> registrar(@RequestBody Cuenta cuenta) {
        Cuenta savedCuenta = cuentaService.registrar(
                cuenta.getEmail(),
                cuenta.getPassword());
        return ResponseEntity.ok(savedCuenta);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        Optional<Cuenta> cuentaOpt = cuentaService.login(email, password);

        Map<String, String> response = new HashMap<>();

        if (cuentaOpt.isPresent()) {
            // Si la autenticación es exitosa
            response.put("message", "Login exitoso. Bienvenido ");
            return ResponseEntity.ok(response);
        } else {
            // Si la autenticación falla
            response.put("message", "Error: Credenciales incorrectas.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

}
