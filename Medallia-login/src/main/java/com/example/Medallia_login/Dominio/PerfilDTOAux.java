package com.example.Medallia_login.Dominio;

public class PerfilDTOAux {
    private String id;

    private String biografia;

    private String imagen;

    public PerfilDTOAux(String id, String biografia, String imagen) {
        this.id = id;
        this.biografia = biografia;
        this.imagen = imagen;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    @Override
    public String toString() {
        return "PerfilDTOAux{" +
                "id='" + id + '\'' +
                ", biografia='" + biografia + '\'' +
                ", imagen='" + imagen + '\'' +
                '}';
    }
}
