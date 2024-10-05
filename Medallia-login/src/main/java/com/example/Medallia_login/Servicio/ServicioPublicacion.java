package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import com.example.Medallia_login.Repositories.RepositorioPublicaciones;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicioPublicacion {
    @Autowired
    private RepositorioPublicaciones repositoriopublicacion;
}
