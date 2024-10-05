package com.example.Medallia_login.Repositories;

import com.example.Medallia_login.Modelos.Publicacion;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RepositorioPublicaciones extends MongoRepository<Publicacion, String> {
    @Override
    List<Publicacion> findAll();
}
