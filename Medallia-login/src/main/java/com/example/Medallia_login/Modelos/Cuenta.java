package com.example.Medallia_login.Modelos;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "Usuarios")
public class Cuenta {

    @Id
    private ObjectId id;

    @Indexed(unique = true)
    private String email;

    private String password;
    private List<ObjectId> medallas;

    private List<String> aplausos;

    public Cuenta(String correo, String password) {
        this.email = correo;
        this.password = password;
        medallas = new ArrayList<>();
        aplausos = new ArrayList<>();
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

    public List<String> getAplausos() {
        return aplausos;
    }

    public void setAplausos(List<String> aplausos) {
        this.aplausos = aplausos;
    }

    public int getMedalCount(){
        if(medallas == null) {
            this.medallas = new ArrayList<>();
        }
        return medallas.size();
    }
}