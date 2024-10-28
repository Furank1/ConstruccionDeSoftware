package com.example.Medallia_login.Modelos;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "Reportes")
public class Reporte {

    @Id
    private ObjectId id;

    private ObjectId usuarioId;
    private ObjectId publicacionId;
    private Instant fecha;
    private String descripcion;

    public Reporte(){

    }

    public Reporte(ObjectId id, ObjectId usuarioId, ObjectId publicacionId, Instant fecha, String descripcion) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.publicacionId = publicacionId;
        this.fecha = fecha;
        this.descripcion = descripcion;
    }

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

    public ObjectId getPublicacionId() {
        return publicacionId;
    }

    public void setPublicacionId(ObjectId publicacionId) {
        this.publicacionId = publicacionId;
    }

    public Instant getFecha() {
        return fecha;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
