package com.example.Repositorio;

import com.example.Documentos.CuentaUsuario;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioCuenta extends MongoRepository <CuentaUsuario,String>{
    CuentaUsuario findByEmail(String email);
}
