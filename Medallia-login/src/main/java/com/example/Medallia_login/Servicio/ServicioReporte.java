package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Modelos.Reporte;
import com.example.Medallia_login.Repositories.RepositorioReportes;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class ServicioReporte {

    @Autowired
    private RepositorioReportes repositorioReportes;

    @Transactional
    public Reporte crearReporte(ObjectId objIdUsuario, ObjectId objIdPublicacion, Instant fecha, String descripcion){
        Reporte reporte = new Reporte();
        reporte.setUsuarioId(objIdUsuario);
        reporte.setPublicacionId(objIdPublicacion);
        reporte.setFecha(fecha);
        reporte.setDescripcion(descripcion);
        repositorioReportes.save(reporte);
        return reporte;
    }
}
