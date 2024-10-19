package com.example.Medallia_login.Controller;


import com.example.Medallia_login.Servicio.ServicioPerfil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/perfil")
public class ControladorPerfil {
    @Autowired
    ServicioPerfil servicioPerfil;

    
}
