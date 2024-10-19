package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.MedalliaLoginApplication;
import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Modelos.Medalla;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import com.example.Medallia_login.Repositories.RepositorioMedallas;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.*;

@Service
public class ServicioMedallas {

    @Autowired
    private RepositorioMedallas repositorioMedallas;
    @Autowired
    private RepositorioCuenta repositorioCuenta;


    public Optional <List<Map<String,Object>>> retornarMedallas(){
        List<Medalla> medallas = repositorioMedallas.findAll();
        List <Map<String,Object>> listaMedallas= new ArrayList<Map<String,Object>>();
        for (Medalla medalla : medallas) {
            Map<String,Object> map = new HashMap<>();
            map.put("id",medalla.getId().toHexString());
            map.put("nombre",medalla.getNombre());
            map.put("aplausos",medalla.getCantidadNecesaria());
            map.put("imagen",medalla.getImagen());
            listaMedallas.add(map);


        }
        Optional<List<Map<String,Object>>> medallasopt= Optional.of(listaMedallas);
        return medallasopt;
    }

    public Optional <List<Cuenta>> retornarmedallasusuarios(){
         List<Cuenta> cuentas = repositorioCuenta.findAll();
         Optional <List<Cuenta>> cuentasopt= Optional.of(cuentas);
        return cuentasopt;
    }
}
