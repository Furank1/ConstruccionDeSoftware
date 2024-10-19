package com.example.Medallia_login.Modelos;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;

@Document(collection="Perfiles")
public class Perfil {

    @Id
    private ObjectId id;
    private String biografia;
    private String foto;
    private ObjectId usuarioId;

    public Perfil(ObjectId usuarioId, String biografia, String foto) {
        this.usuarioId = usuarioId;
        this.biografia = biografia;
        this.foto = foto;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getIdUsuario() {
        return usuarioId;
    }

    public void setIdUsuario(ObjectId idUsuario) {
        this.usuarioId= idUsuario;
    }

    public String getBiografia() {
        return biografia;
    }

    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }

    public String getImagenURL() {
        return foto;
    }

    public void setImagenURL(String imagenURL) {
        foto = imagenURL;
    }
}
