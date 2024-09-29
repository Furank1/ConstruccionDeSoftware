package com.example.Medallia_login.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Usuarios") // Especifica la colección en MongoDB
public class Cuenta {

    @Id
    private String id;
    public String email;
    public String password;

    public Cuenta(String email, String password) {
        this.password = password;
        this.email = email;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }


    public String getEmail() {
        return email;
    }
}
