package com.example.Medallia_login.Controller;
import com.example.Medallia_login.Dominio.CuentaDTO;
import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import com.example.Medallia_login.Servicio.ServicioCuenta;
import com.example.Medallia_login.Servicio.ServicioPublicacion;
import org.bson.io.BsonOutput;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;

@RestController
@RequestMapping ("/home")
public class ControladorPublicaciones {

    @Autowired
    private ServicioPublicacion servicioPublicacion;

    @CrossOrigin(origins = "*")
    @PostMapping("/aplauso") // Agregar {id} a la ruta
    public ResponseEntity<String> incrementarAplausos(@RequestParam("id") String id) {
        System.out.println("llega al controlador");
        if(!id.isEmpty()){
            ObjectId objectId = new ObjectId(id);
            servicioPublicacion.incrementarAplausosPorId(objectId);
            return ResponseEntity.ok("Número de aplausos incrementado en 1.");

        }
        else{
            System.out.println("entro al catch");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Publicación no encontrada.");
        }

    }


}
