package com.example.Medallia_login.Controller;

import com.example.Medallia_login.Dominio.ReporteDTO;
import com.example.Medallia_login.Modelos.Reporte;
import com.example.Medallia_login.Servicio.ServicioReporte;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reporte")
public class ControladorReportes {

    @Autowired
    private ServicioReporte servicioReporte;

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public ResponseEntity<?> crearReporte(@RequestBody ReporteDTO reporteDTO){
        System.out.println("Llega ReporteDTO");
        ObjectId objIdUsuario = new ObjectId(reporteDTO.getUsuarioId());
        ObjectId objIdPublicacion = new ObjectId(reporteDTO.getPublicacionId());
        Reporte reporteGuardado = servicioReporte.crearReporte(objIdUsuario, objIdPublicacion, reporteDTO.getFecha(), reporteDTO.getDescripcion());
        return ResponseEntity.ok(reporteGuardado);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/all")
    public List<HashMap<String,String>> devolverpublicaciones  (){
        return servicioReporte.devolverreportes();
    }

}
