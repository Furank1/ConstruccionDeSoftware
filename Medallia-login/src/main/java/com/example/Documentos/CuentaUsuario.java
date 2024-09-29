package com.example.Documentos;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Document(collection = "cuentas_usuarios")
public class CuentaUsuario {

    @Id
    private String id;
    private String email;
    private String password;

    // Constructor vacío para que el framework pueda instanciar el objeto
    public CuentaUsuario() {
    }

    public CuentaUsuario(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    // Método para encriptar la contraseña (recomendado)
    public void setEncodedPassword(String rawPassword) {
        this.password = encodePassword(rawPassword);
    }

    // Método que usa BCrypt para cifrar la contraseña
    private String encodePassword(String rawPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(rawPassword);
    }
}
