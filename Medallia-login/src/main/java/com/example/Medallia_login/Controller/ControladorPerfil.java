package com.example.Medallia_login.Controller;


import com.example.Medallia_login.Dominio.PerfilDTO;
import com.example.Medallia_login.Dominio.PublicacionDTO;
import com.example.Medallia_login.Modelos.Perfil;
import com.example.Medallia_login.Servicio.ServicioCuenta;
import com.example.Medallia_login.Servicio.ServicioPerfil;
import com.example.Medallia_login.Servicio.ServicioPublicacion;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/perfil")
public class ControladorPerfil {
    @Autowired
    ServicioPerfil servicioPerfil;
    @Autowired
    ServicioCuenta servicioCuenta;
    @Autowired
    ServicioPublicacion servicioPublicacion;

    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    public PerfilDTO getPerfil(@RequestParam("id") String id) {
        Perfil perfil= servicioPerfil.ObtenerPerfil(id);
        PerfilDTO perfilDTO = new PerfilDTO();
        perfilDTO.setBiografia(perfil.getBiografia());
        perfilDTO.setImagen(perfil.getImagenURL());
        List<String> medallasUsuario = servicioCuenta.retornarMedallasUsuarioUnico(id).stream().map(ObjectId::toHexString).toList();
        perfilDTO.setMedallasUsuario(medallasUsuario);
        List<PublicacionDTO> publicacionesUsuario = servicioPublicacion.obtenerPublicacionesUsuarioDTO(id);
        perfilDTO.setPublicacionesUsuario(publicacionesUsuario);
        return perfilDTO;
    }


}
