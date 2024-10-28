package com.example.Medallia_login.Dominio;

import java.util.List;

public class CuentaMedallasDTO {
    public String id;
    public List<String> medallas;
    public int medallas_total;

    public CuentaMedallasDTO(String id, List<String> medallas, int medallas_total) {
        this.id = id;
        this.medallas = medallas;
        this.medallas_total = medallas_total;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getMedallas() {
        return medallas;
    }

    public void setMedallas(List<String> medallas) {
        this.medallas = medallas;
    }

    public int getMedallas_total() {
        return medallas_total;
    }

    public void setMedallas_total(int medallas_total) {
        this.medallas_total = medallas_total;
    }
}
