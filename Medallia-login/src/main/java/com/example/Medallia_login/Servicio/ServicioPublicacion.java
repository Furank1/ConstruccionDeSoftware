package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Dominio.PublicacionDTO;
import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Modelos.Medalla;
import com.example.Medallia_login.Modelos.Publicacion;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import com.example.Medallia_login.Repositories.RepositorioMedallas;
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
    @Autowired
    private ServicioMedallas servicioMedallas;
    @Autowired
    private RepositorioMedallas repositorioMedallas;

    public List<Publicacion> obtenerPublicaciones(){
        return repositoriopublicacion.findAll();
    }


    public void incrementarAplausosPorId(ObjectId publicacionId) {
        //System.out.println(publicacionId);
        //System.out.println("llega al servicio");
        Optional<Publicacion> publicacion = repositoriopublicacion.findById(publicacionId);
        if(publicacion.isPresent()){
            //System.out.println("encontrono una publicacion : "+ publicacion.get().getDescripcion());
            publicacion.get().setAplausos(publicacion.get().getAplausos()+1);
            entregarMedalla(publicacion.get());
            repositoriopublicacion.save(publicacion.get());
        }else{
            System.out.println("no");
        }
    }

    public void disminuiriAplausosPorId(ObjectId publicacionId) {
        //System.out.println(publicacionId);
        //System.out.println("llega al servicio");
        Optional<Publicacion> publicacion = repositoriopublicacion.findById(publicacionId);
        if(publicacion.isPresent()){
            //System.out.println("encontrono una publicacion : "+ publicacion.get().getDescripcion());
            if(publicacion.get().getAplausos()>0) {
                publicacion.get().setAplausos(publicacion.get().getAplausos() - 1);
                repositoriopublicacion.save(publicacion.get());
            }
        }else{
            System.out.println("no");
        }
    }

    public void entregarMedalla(Publicacion publicacion){
        ObjectId usuarioId = publicacion.getUsuarioId();
        Optional<Cuenta> cuentaOpt = repositoriocuenta.findById(usuarioId.toHexString());
        if(cuentaOpt.isPresent()) {
            Cuenta cuenta = cuentaOpt.get();
            System.out.println(cuenta.getId().toHexString());
            ObjectId medallaObjId = publicacion.getMedalla();
            if(medallaObjId == null) {
                medallaObjId = new ObjectId("000000000000000000000000");
            }
            System.out.println(medallaObjId);
            Optional<Medalla> medalla = repositorioMedallas.findById(medallaObjId);
            if(medalla.isPresent()) {
                if(medalla.get().getCantidadNecesaria() <= publicacion.getAplausos()){
                    System.out.println("Cantidad de aplausos alcanzada");
                    if(!publicacion.getTieneMedalla()) {
                        System.out.println("Entregando medalla: " +medalla.get().getNombre());
                        if(cuenta.getMedallas() == null) {
                            cuenta.setMedallas(new ArrayList<>());
                        }
                        cuenta.getMedallas().add(medallaObjId);
                        System.out.println(cuenta.getMedallas().toString());
                        publicacion.setTieneMedalla(true);
                        repositoriocuenta.save(cuenta);
                    } else {
                        System.out.println("Usuario ya tiene medalla");
                    }
                } else {
                    System.out.println("Cantidad de aplausos no alcanzada");
                }
            } else {
                System.out.println("Medalla no esta en la base de datos");
            }
        } else {
            System.out.println("No hay cuenta");
        }
    }

    public List<PublicacionDTO> convertirListaDTO(List<Publicacion> publicaciones){
        List<PublicacionDTO> publicacionDTOs = new ArrayList<>();
        for(Publicacion publicacion : publicaciones){
            Optional<Cuenta> usuario = repositoriocuenta.findById(publicacion.getUsuarioId().toHexString());
            PublicacionDTO pubDTO;

            if(publicacion.getMedalla() == null) {
                pubDTO = new PublicacionDTO(publicacion.getId().toHexString(), publicacion.getUsuarioId().toHexString(),usuario.get().getEmail(), publicacion.getDescripcion(), publicacion.getImagen(), publicacion.getFecha(), publicacion.getAplausos(), "0");
            } else {
                pubDTO = new PublicacionDTO(publicacion.getId().toHexString(), publicacion.getUsuarioId().toHexString(),usuario.get().getEmail(), publicacion.getDescripcion(), publicacion.getImagen(), publicacion.getFecha(), publicacion.getAplausos(), publicacion.getMedalla().toHexString());
            }
            publicacionDTOs.add(pubDTO);
        }
        return publicacionDTOs;
    }

    @Transactional
    public Publicacion crearPublicacion(ObjectId objectId, String descripcion, Instant fecha, String imagen, int aplausos, ObjectId objIdMedallas){
        Publicacion publicacion = new Publicacion();
        publicacion.setUsuarioId(objectId);
        publicacion.setDescripcion(descripcion);
        publicacion.setFecha(fecha);
        publicacion.setImagen(imagen);
        System.out.println(publicacion.getImagen());
        publicacion.setAplausos(aplausos);
        publicacion.setMedalla(objIdMedallas);
        publicacion.setTieneMedalla(false);
        repositorioPublicaciones.save(publicacion);
        return publicacion;
    }

    public List<PublicacionDTO> obtenerPublicacionesUsuarioDTO(String objId) {
        List<Publicacion> publicacionesUsuario = new ArrayList<>();
        List<Publicacion> publicaciones = obtenerPublicaciones();
        for(Publicacion publicacion : publicaciones) {
            if(publicacion.getUsuarioId().toHexString().equals(objId)) {
                publicacionesUsuario.add(publicacion);
            }
        }
        return convertirListaDTO(publicacionesUsuario);
    }

    public List<String> incrementarAplausosEnLista(String publicacionId, String usuarioId){
        ObjectId publicacionIdObj = new ObjectId(publicacionId);
        incrementarAplausosPorId(publicacionIdObj);
        Optional<Cuenta> usuarioActual = repositoriocuenta.findById(usuarioId);
        if(usuarioActual.isPresent()) {
            //System.out.println(usuarioActual.get().getAplausos().toString());
            if(usuarioActual.get().getAplausos() == null) {
                //System.out.println("no aplausos");
                usuarioActual.get().setAplausos(new ArrayList<>());
            }
            usuarioActual.get().getAplausos().add(publicacionId);
            System.out.println("aplauso");
        }
        System.out.println(usuarioActual.get().getAplausos().toString());
        repositoriocuenta.save(usuarioActual.get());
        return usuarioActual.get().getAplausos();
    }

    public List<String> disminuirAplausosEnLista(String publicacionId, String usuarioId){
        ObjectId publicacionIdObj = new ObjectId(publicacionId);
        disminuiriAplausosPorId(publicacionIdObj);
        Optional<Cuenta> usuarioActual = repositoriocuenta.findById(usuarioId);
        if(usuarioActual.isPresent()) {
            //System.out.println(usuarioActual.get().getAplausos().toString());
            if(usuarioActual.get().getAplausos() == null) {
                //System.out.println("no aplausos");
                usuarioActual.get().setAplausos(new ArrayList<>());
            }
            usuarioActual.get().getAplausos().remove(publicacionId);
            System.out.println("quitar aplauso");
        }
        System.out.println(usuarioActual.get().getAplausos().toString());
        repositoriocuenta.save(usuarioActual.get());
        return usuarioActual.get().getAplausos();
    }
}
