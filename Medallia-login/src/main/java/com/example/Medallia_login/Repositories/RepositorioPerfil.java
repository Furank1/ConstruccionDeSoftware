package com.example.Medallia_login.Repositories;

import com.example.Medallia_login.Modelos.Perfil;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RepositorioPerfil extends MongoRepository<Perfil, ObjectId> {
    Optional<Perfil> findByUsuarioId(ObjectId usuarioId);
}
