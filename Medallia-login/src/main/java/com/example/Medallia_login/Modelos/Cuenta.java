package com.example.Medallia_login.Modelos;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Usuarios")
public class Cuenta {

    @Id
    private ObjectId id;

    @Indexed(unique = true)
    private String email;

    private String password;

    public Cuenta(String correo, String password) {
        this.email = correo;
        this.password = password;
    }

    public Cuenta(){}

    public ObjectId getId() {
        return id;
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