package com.example.Medallia_login.Dominio;

public class PubAplausosDTO {
    String publicacionId;
    String usuarioId;

    public PubAplausosDTO(String usuarioId, String publicacionId) {
        this.usuarioId = usuarioId;
        this.publicacionId = publicacionId;
    }

    public String getPublicacionId() {
        return publicacionId;
    }

    public void setPublicacionId(String publicacionId) {
        this.publicacionId = publicacionId;
    }

    public String getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(String usuarioId) {
        this.usuarioId = usuarioId;
    }
}
