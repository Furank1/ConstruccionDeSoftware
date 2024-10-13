package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Modelos.Medalla;
import com.example.Medallia_login.Repositories.RepositorioMedallas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.*;

@Service
public class ServicioMedallas {

    @Autowired
    private RepositorioMedallas repositorioMedallas;


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
}
