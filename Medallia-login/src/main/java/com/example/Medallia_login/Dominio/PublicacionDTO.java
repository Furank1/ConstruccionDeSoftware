package com.example.Medallia_login.Dominio;

import java.time.Instant;

public class PublicacionDTO {
    private String id;
    private String usuarioId;
    private String nombreUsuario;
    private String descripcion;
    private String imagen;
    private Instant fecha;
    private int aplausos;
    private String medalla;

    public PublicacionDTO(String id, String usuarioId, String nombreUsuario, String descripcion, String imagen, Instant fecha, int aplausos, String medalla) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.nombreUsuario = nombreUsuario;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.fecha = fecha;
        this.aplausos = aplausos;
        this.medalla = medalla;
    }

    public PublicacionDTO(String id, String usuarioId, String nombreUsuario, String descripcion, String imagen, Instant fecha, int aplausos) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.nombreUsuario = nombreUsuario;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.fecha = fecha;
        this.aplausos = aplausos;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(String usuarioId) {
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

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getMedalla() {
        return medalla;
    }

    public void setMedalla(String medalla) {
        this.medalla = medalla;
    }
}
