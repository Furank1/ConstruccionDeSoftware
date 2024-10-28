package com.example.Medallia_login.Dominio;

import java.time.Instant;

public class ReporteDTO {
    //private String id;
    private String usuarioId;
    private String publicacionId;
    private Instant fecha;
    private String descripcion;

    public ReporteDTO(String usuarioId, String publicacionId, Instant fecha, String descripcion) {
        //this.id = id;
        this.usuarioId = usuarioId;
        this.publicacionId = publicacionId;
        this.fecha = fecha;
        this.descripcion = descripcion;
    }

    public String getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(String usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getPublicacionId() {
        return publicacionId;
    }

    public void setPublicacionId(String publicacionId) {
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
