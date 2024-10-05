package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Modelos.Publicacion;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import com.example.Medallia_login.Repositories.RepositorioPublicaciones;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioPublicacion {
    @Autowired
    private RepositorioPublicaciones repositoriopublicacion;

    public List<Publicacion> obtenerPublicaciones(){
        return repositoriopublicacion.findAll();
    }
}
