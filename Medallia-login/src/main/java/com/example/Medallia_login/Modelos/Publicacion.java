package com.example.Medallia_login.Modelos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "Publicaciones")
public class Publicacion {

    @Id
    private ObjectId id;  // Usamos ObjectId para el _id

    private ObjectId usuarioId;  // También para usuarioId si deseas usar ObjectId para referencias

    private String descripcion;

    private String imagen;

    private Instant fecha;

    private int aplausos;

    private ObjectId medalla;

    private Boolean tieneMedalla;

    // Constructor vacío
    public Publicacion() {}

    // Constructor con parámetros
    public Publicacion(ObjectId usuarioId, String descripcion, String imagen, Instant fecha, int aplausos, ObjectId medalla) {
        this.usuarioId = usuarioId;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.fecha = fecha;
        this.aplausos = aplausos;
        this.medalla = medalla;
        tieneMedalla = false;
    }

    // Getters y setters
    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(ObjectId usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Instant getFecha() {
        return fecha;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public int getAplausos() {
        return aplausos;
    }

    public void setAplausos(int aplausos) {
        this.aplausos = aplausos;
    }

    public ObjectId getMedalla() {
        return medalla;
    }

    public void setMedalla(ObjectId medalla) {
        this.medalla = medalla;
    }

    public Boolean getTieneMedalla() {
        return tieneMedalla;
    }

    public void setTieneMedalla(Boolean tieneMedalla) {
        this.tieneMedalla = tieneMedalla;
    }
}