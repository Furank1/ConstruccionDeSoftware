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
        if(perfil.isPresent()){
            return perfil.get();
        } else {
            return new Perfil(id, "", "");
        }
        
    }

    public Perfil actualizarPerfil (String perfilId, String biografia, String imagen){
        ObjectId id = new ObjectId(perfilId);
        Optional<Perfil> perfilActual = repositorioPerfil.findByUsuarioId(id);
        
        if(perfilActual.isPresent()){
            perfilActual.get().setBiografia(biografia);
            perfilActual.get().setImagenURL(imagen);
            System.out.println("Falopa máxima");
            repositorioPerfil.save(perfilActual.get());
            return perfilActual.get();
        }else{
            System.out.println("No se encontro el perfil: Falota triste");
            Perfil perfilNuevo = new Perfil(id, biografia, imagen);
            repositorioPerfil.save(perfilNuevo);
            return perfilNuevo;
        }
    }
}
