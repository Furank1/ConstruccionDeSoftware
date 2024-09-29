package com.example.Medallia_login.Controller;

import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/login")
public class ControladorCuenta {
    @Autowired
    private RepositorioCuenta repositorioCuenta;

    @CrossOrigin (origins="*")
    @GetMapping
    

}