package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Dominio.CuentaDTO;
import com.example.Medallia_login.Dominio.CuentaMedallasDTO;
import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Modelos.Medalla;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ServicioCuenta {
        @Autowired
        private RepositorioCuenta repositoriocuenta;

    public Optional<Cuenta> login(String email, String password) {
        Cuenta cuenta = repositoriocuenta.findByEmail(email);
        Optional <Cuenta> cuentaopt= Optional.ofNullable(cuenta);
        return cuentaopt;
    }

    public List<ObjectId> retornarMedallasUsuarioUnico(String usuarioId) {
        Cuenta cuentaAux = repositoriocuenta.findById(usuarioId).get();
        List<ObjectId> medallasUsuario = cuentaAux.getMedallas();
        return medallasUsuario;
    }

    public List<String> getPublicacionesAplaudidas(String usuarioId) {
        Cuenta cuentaAux = repositoriocuenta.findById(usuarioId).get();
        List<String> pubAplaudidasUsuario = cuentaAux.getAplausos();
        if (pubAplaudidasUsuario == null) {
            pubAplaudidasUsuario = new ArrayList<>();
        }
        return pubAplaudidasUsuario;
    }

    public List<Cuenta> getUsuariosMasMedallas(){
        List<Cuenta> cuentas = repositoriocuenta.findAll();
        //List<String> usuariosMasMedallas = new ArrayList<>();

        cuentas.sort(Comparator.comparingInt(Cuenta::getMedalCount).reversed());

        return cuentas;
    }

    public List<CuentaMedallasDTO> convertirCuentaADTO(List<Cuenta> cuentas){
        List<CuentaMedallasDTO> cuentasDTO = new ArrayList<>();
        for (Cuenta cuenta : cuentas) {
            List<String> medallas = cuenta.getMedallas().stream().map(ObjectId::toString).toList();
            int count = cuenta.getMedalCount();
            CuentaMedallasDTO cuentaMedallasDTO = new CuentaMedallasDTO(cuenta.getId().toString(), medallas, count);
            cuentasDTO.add(cuentaMedallasDTO);
        }

        return cuentasDTO;
    }



}



