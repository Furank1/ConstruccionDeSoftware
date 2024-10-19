package com.example.Medallia_login.Dominio;

import org.bson.types.ObjectId;

import java.util.List;

public class PerfilDTO {


    private String biografia;

    private String imagen;

    private List<String> medallasUsuario;

    private List<PublicacionDTO> publicacionesUsuario;


    public String getBiografia() {
        return biografia;
    }

    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public List<String> getMedallasUsuario() {
        return medallasUsuario;
    }

    public void setMedallasUsuario(List<String> medallasUsuario) {
        this.medallasUsuario = medallasUsuario;
    }

    public List<PublicacionDTO> getPublicacionesUsuario() {
        return publicacionesUsuario;
    }

    public void setPublicacionesUsuario(List<PublicacionDTO> publicacionesUsuario) {
        this.publicacionesUsuario = publicacionesUsuario;
    }

}
