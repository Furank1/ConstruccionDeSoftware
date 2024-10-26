package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Modelos.Publicacion;
import com.example.Medallia_login.Modelos.Reporte;
import com.example.Medallia_login.Repositories.RepositorioPublicaciones;
import com.example.Medallia_login.Repositories.RepositorioReportes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class ServicioReporte {

    @Autowired
    private RepositorioReportes repositorioReportes;
    @Autowired
    private RepositorioPublicaciones repositorioPublicaciones;

    public List<HashMap<String,String>> devolverpublicaciones(){
         List <Reporte> reportes = repositorioReportes.findAll();
         for (int i=0;i<reportes.size();i++){
             HashMap<String,String> aux1 = new HashMap<>();

         }
         return null;
    }
}
