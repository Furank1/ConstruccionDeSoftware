package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Repositories.RepositorioMedallas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicioMedallas {

    @Autowired
    private RepositorioMedallas repositorioMedallas;
}
