package com.example.Medallia_login.Controller;
import com.example.Medallia_login.Dominio.CuentaDTO;
import com.example.Medallia_login.Dominio.PublicacionDTO;
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

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping ("/publicaciones")
public class ControladorPublicaciones {

    @Autowired
    private ServicioPublicacion servicioPublicacion;
    //http://localhost:8080/publicaciones/aplauso?id=67008e415db9265054a9bf37
    @CrossOrigin(origins = "*")
    @PostMapping("/aplauso") // Agregar {id} a la ruta
    public ResponseEntity<?> incrementarAplausos(@RequestParam("id") String id) {
        //System.out.println("llega al controlador");
        if(!id.isEmpty()){
            ObjectId objectId = new ObjectId(id);
            servicioPublicacion.incrementarAplausosPorId(objectId);
            return ResponseEntity.ok("{\"message\": \"ola\"}");
        }
        else{
            System.out.println("entro al catch");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Publicación no encontrada.");
        }

    }

    //http://localhost:8080/publicaciones/get
    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    public List<PublicacionDTO> getPublicaciones(){
        List<Publicacion> publicaciones = servicioPublicacion.obtenerPublicaciones();
        System.out.println("llega aca");
        return servicioPublicacion.convertirListaDTO(publicaciones);
    }

    //http://localhost:8080/publicaciones/register
    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public ResponseEntity<?> crearPublicacion(@RequestBody PublicacionDTO publicacionDTO){
        System.out.println("Llega pubDTO");
        ObjectId objId = new ObjectId(publicacionDTO.getUsuarioId());
        ObjectId objIdMedalla = new ObjectId(publicacionDTO.getMedalla());
        Publicacion publiGuardada = servicioPublicacion.crearPublicacion(objId, publicacionDTO.getDescripcion(), publicacionDTO.getFecha(), publicacionDTO.getImagen(), publicacionDTO.getAplausos(), objIdMedalla);
        return ResponseEntity.ok(publiGuardada);
    }

}
