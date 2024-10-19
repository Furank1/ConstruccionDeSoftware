package com.example.Medallia_login.Servicio;

import com.example.Medallia_login.Modelos.Cuenta;
import com.example.Medallia_login.Modelos.Medalla;
import com.example.Medallia_login.Repositories.RepositorioCuenta;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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


}



