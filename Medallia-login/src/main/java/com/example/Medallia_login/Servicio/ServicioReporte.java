package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Modelos.Publicacion;
import com.example.Medallia_login.Modelos.Reporte;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import com.example.Medallia_login.Repositories.RepositorioPublicaciones;
import com.example.Medallia_login.Repositories.RepositorioReportes;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class ServicioReporte {

    @Autowired
    private RepositorioReportes repositorioReportes;
    @Autowired
    private RepositorioPublicaciones repositorioPublicaciones;
    @Autowired
    private RepositorioCuenta repositorioCuenta;

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


    public List<HashMap<String,String>> devolverreportes(){
         List <Reporte> reportes = repositorioReportes.findAll();
         List<HashMap<String,String>> reporteList = new ArrayList<>();
        for (Reporte reporte : reportes) {
            HashMap<String, String> aux1 = new HashMap<>();
            String id = reporte.getUsuarioId().toString();
            Optional<Cuenta> cuenta = repositorioCuenta.findById(id);
            if (cuenta.isPresent()) {
                aux1.put("nombreUsuario", cuenta.get().getEmail());
            }
            aux1.put("fecha", reporte.getFecha().toString());
            aux1.put("descripcion", reporte.getDescripcion());
            Publicacion publicacion = repositorioPublicaciones.findById(reporte.getPublicacionId()).orElse(null);
            if (publicacion != null) {
                aux1.put("DescripcionPublicacion", publicacion.getDescripcion());
                aux1.put("imagen", publicacion.getImagen());
            }
            reporteList.add(aux1);

        }
         return reporteList;
    }
}
