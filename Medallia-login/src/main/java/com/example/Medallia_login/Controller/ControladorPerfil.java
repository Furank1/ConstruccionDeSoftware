package com.example.Medallia_login.Controller;


import com.example.Medallia_login.Dominio.PerfilDTO;
import com.example.Medallia_login.Modelos.Perfil;
import com.example.Medallia_login.Servicio.ServicioPerfil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/perfil")
public class ControladorPerfil {
    @Autowired
    ServicioPerfil servicioPerfil;

    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    public PerfilDTO getPerfil(@RequestParam("id") String id) {
        Perfil perfil= servicioPerfil.ObtenerPerfil(id);
        PerfilDTO perfilDTO = new PerfilDTO();
        perfilDTO.setBiografia(perfil.getBiografia());
        perfilDTO.setImagen(perfil.getImagenURL());
        return perfilDTO;
    }


}
