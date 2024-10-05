package com.example.Medallia_login.Repositories;

import com.example.Medallia_login.Modelos.Publicacion;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Repository
    Optional<Publicacion> findById(ObjectId id);
    List<Publicacion> findAll();
    @Override
public interface RepositorioPublicaciones extends MongoRepository<Publicacion, ObjectId> {
}
