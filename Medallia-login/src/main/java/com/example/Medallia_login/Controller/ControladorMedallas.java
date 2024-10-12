package com.example.Medallia_login.Controller;

import com.example.Medallia_login.Modelos.Medalla;
import com.example.Medallia_login.Servicio.ServicioMedallas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/medallas")
public class ControladorMedallas {
    @Autowired
    private ServicioMedallas servicioMedallas;

    @CrossOrigin(origins = "*")
    @GetMapping("/obtenermedallas")
    public ResponseEntity<List<Map<String,Object>>> obtenerMedallas() {
        Optional <List<Map<String,Object>>> medallasopt = servicioMedallas.retornarMedallas();
        return medallasopt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }



}
