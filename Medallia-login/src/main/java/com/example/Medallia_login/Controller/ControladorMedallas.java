package com.example.Medallia_login.Controller;

import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Modelos.Medalla;
import com.example.Medallia_login.Servicio.ServicioMedallas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.bson.types.ObjectId;


import java.util.*;
import java.util.stream.Collectors;

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

    @CrossOrigin(origins = "*")
    @GetMapping("/obtenermedallasusuarios")
    public ResponseEntity<List<Map<String, Object>>> obtenerMedalla() {
        Optional<List<Cuenta>> cuentasopt = servicioMedallas.retornarmedallasusuarios();

        if (cuentasopt.isPresent()) {
            List<Cuenta> cuentas = cuentasopt.get();
            List<Map<String, Object>> respuesta = new ArrayList<>();

            for (Cuenta cuenta : cuentas) {
                Map<String, Object> cuentaMap = new HashMap<>();
                cuentaMap.put("email", cuenta.getEmail());

                if (cuenta.getMedallas() != null) { // Verificar si la lista de medallas no es null
                    List<String> medallasHex = cuenta.getMedallas().stream()
                            .map(ObjectId::toHexString) // Convertir ObjectId a HexString
                            .collect(Collectors.toList());
                    cuentaMap.put("medallas", medallasHex);
                } else {
                    cuentaMap.put("medallas", Collections.emptyList()); // Si es null, retornar una lista vacía
                }

                respuesta.add(cuentaMap);
            }

            return ResponseEntity.ok(respuesta);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }




}
