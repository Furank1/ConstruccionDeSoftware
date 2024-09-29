package com.example.Medallia_login.Modelos;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Usuarios")
public class Cuenta {

    @Id
    private String id;

    private String correo;

    private String contrasena;

    public Cuenta(String correo, String contrasena) {
        this.correo = correo;
        this.contrasena = contrasena;
    }

    public Cuenta(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}