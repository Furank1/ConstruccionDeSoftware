package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Dominio.PerfilDTO;
import com.example.Medallia_login.Modelos.Perfil;
import com.example.Medallia_login.Repositories.RepositorioPerfil;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ServicioPerfil {
    @Autowired
    private RepositorioPerfil repositorioPerfil;

    public Perfil ObtenerPerfil (String idusuario){
        System.out.println(idusuario);
        ObjectId id = new ObjectId(idusuario);
        Optional<Perfil> perfil = repositorioPerfil.findByUsuarioId(id);
        return perfil.orElse(null);
    }

    public Perfil actualizarPerfil (String perfilId, String biografia, String imagen){
        ObjectId id = new ObjectId(perfilId);
        Optional<Perfil> perfilActual = repositorioPerfil.findById(id);
        
        if(perfilActual.isPresent()){
            perfilActual.get().setBiografia(biografia);
            perfilActual.get().setImagenURL(imagen);
            System.out.println("Falopa máxima");
            repositorioPerfil.save(perfilActual.get());
        }else{
            System.out.println("No se encontro el perfil: Falota triste");
        }

        return perfilActual.orElse(null);
    }
}
