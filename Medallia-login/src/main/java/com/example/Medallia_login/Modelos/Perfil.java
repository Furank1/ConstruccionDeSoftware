package com.example.Medallia_login.Modelos;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;

@Document(collection="Perfiles")
public class Perfil {

    @Id
    private ObjectId id;
    private ObjectId idUsuario;
    private String biografia;
    private String ImagenURL;

    public Perfil(ObjectId idUsuario, String biografia, String imagenURL) {
        this.idUsuario = idUsuario;
        this.biografia = biografia;
        ImagenURL = imagenURL;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(ObjectId idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getBiografia() {
        return biografia;
    }

    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }

    public String getImagenURL() {
        return ImagenURL;
    }

    public void setImagenURL(String imagenURL) {
        ImagenURL = imagenURL;
    }
}
