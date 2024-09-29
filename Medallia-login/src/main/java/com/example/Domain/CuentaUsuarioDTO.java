package com.example.Domain;



public class CuentaUsuarioDTO {

    private String email;
    private String password;

    // Constructor vacío
    public CuentaUsuarioDTO() {
    }

    // Constructor con parámetros
    public CuentaUsuarioDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters y setters
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
