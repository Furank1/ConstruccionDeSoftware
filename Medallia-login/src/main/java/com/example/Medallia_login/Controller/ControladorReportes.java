package com.example.Medallia_login.Controller;

import com.example.Medallia_login.Servicio.ServicioReporte;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/reporte")
public class ControladorReportes {

    @Autowired
    private ServicioReporte servicioReporte;

    @CrossOrigin(origins = "*")
    @GetMapping("/all")
    public List<List<HashMap<String,String>>> devolverpublicaciones  (){

    }

}
