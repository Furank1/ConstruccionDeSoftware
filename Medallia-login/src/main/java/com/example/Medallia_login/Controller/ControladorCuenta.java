package com.example.Medallia_login.Controller;

import com.example.Medallia_login.Dominio.CuentaDTO;
import com.example.Medallia_login.Dominio.CuentaMedallasDTO;
import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import com.example.Medallia_login.Servicio.ServicioCuenta;
import org.bson.io.BsonOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping ("/cuenta")
public class ControladorCuenta {
    @Autowired
    private ServicioCuenta servicioCuenta;

    //http://localhost:8080/publicaciones/get
    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody CuentaDTO loginRequest) {
        Optional <Cuenta> cuentaopt= servicioCuenta.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (cuentaopt.isPresent()) {
            Cuenta cuenta = cuentaopt.get();
            Map<String, Object> response = new HashMap<>();
            response.put("id", cuenta.getId().toHexString());
            response.put("email", cuenta.getEmail());
            response.put("ok", true);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("pubaplaudidas")
    public List<String> getPublicacionesAplaudidas(@RequestParam("id") String id){
        List<String> pubAplaudidasUsuario = servicioCuenta.getPublicacionesAplaudidas(id);
        return pubAplaudidasUsuario;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("cuentasmasmedallas")
    public List<CuentaMedallasDTO> cuentasConMasMedallas(){
        List<Cuenta> cuentas = servicioCuenta.getUsuariosMasMedallas();
        System.out.println(cuentas.toString());
        System.out.println(servicioCuenta.convertirCuentaADTO(cuentas).toString());
        return servicioCuenta.convertirCuentaADTO(cuentas);
    }


}