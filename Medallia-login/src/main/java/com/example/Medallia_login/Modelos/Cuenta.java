package com.example.Medallia_login.Modelos;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Usuarios")
public class Cuenta {

    @Id
    private ObjectId id;

    @Indexed(unique = true)
    private String email;

    private String password;
    private List<ObjectId> medallas;

    public Cuenta(String correo, String password) {
        this.email = correo;
        this.password = password;
    }

    public Cuenta(){}

    public ObjectId getId() {
        return id;
    }

    public List<ObjectId> getMedallas() {
        return medallas;
    }

    public void setMedallas(List<ObjectId> medallas) {
        this.medallas = medallas;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}