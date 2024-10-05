package com.example.Medallia_login.Controller;
import com.example.Medallia_login.Dominio.CuentaDTO;
import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Modelos.Publicacion;
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

import java.util.List;

@RestController
@RequestMapping ("/publicaciones")
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


    @Autowired
    private ServicioPublicacion servicioPublicacion;

    //http://localhost:8080/publicaciones/get
    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    public List<Publicacion> getPublicaciones(){
        return servicioPublicacion.obtenerPublicaciones();
    }
}
