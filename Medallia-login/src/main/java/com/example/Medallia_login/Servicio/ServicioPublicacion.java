package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Dominio.PublicacionDTO;
import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Modelos.Publicacion;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import com.example.Medallia_login.Repositories.RepositorioPublicaciones;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import java.util.Optional;

@Service
public class ServicioPublicacion {
    @Autowired
    private RepositorioPublicaciones repositoriopublicacion;

    @Autowired
    private RepositorioCuenta repositoriocuenta;
    @Autowired
    private RepositorioPublicaciones repositorioPublicaciones;

    public List<Publicacion> obtenerPublicaciones(){
        return repositoriopublicacion.findAll();
    }


    public void incrementarAplausosPorId(ObjectId publicacionId) {
        System.out.println(publicacionId);
        System.out.println("llega al servicio");
        Optional<Publicacion> publicacion = repositoriopublicacion.findById(publicacionId);
        if(publicacion.isPresent()){
            System.out.println("encontrono una publicacion : "+ publicacion.get().getDescripcion());
            publicacion.get().setAplausos(publicacion.get().getAplausos()+1);
            repositoriopublicacion.save(publicacion.get());
        }else{
            System.out.println("no");
        }
    }

    public List<PublicacionDTO> convertirListaDTO(List<Publicacion> publicaciones){
        List<PublicacionDTO> publicacionDTOs = new ArrayList<>();
        for(Publicacion publicacion : publicaciones){
            Optional<Cuenta> usuario = repositoriocuenta.findById(publicacion.getUsuarioId().toHexString());

            PublicacionDTO pubDTO = new PublicacionDTO(publicacion.getId().toHexString(), publicacion.getUsuarioId().toHexString(),usuario.get().getEmail(), publicacion.getDescripcion(), publicacion.getImagen(), publicacion.getFecha(), publicacion.getAplausos());
            publicacionDTOs.add(pubDTO);
        }
        return publicacionDTOs;
    }

    @Transactional
    public Publicacion crearPublicacion(ObjectId objectId, String descripcion, Instant fecha, String imagen, int aplausos){
        Publicacion publicacion = new Publicacion();
        publicacion.setUsuarioId(objectId);
        publicacion.setDescripcion(descripcion);
        publicacion.setFecha(fecha);
        publicacion.setImagen(imagen);
        publicacion.setAplausos(aplausos);
        repositorioPublicaciones.save(publicacion);

        return publicacion;
    }
}
