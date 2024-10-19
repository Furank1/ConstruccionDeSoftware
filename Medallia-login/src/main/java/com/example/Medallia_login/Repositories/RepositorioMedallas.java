package com.example.Medallia_login.Repositories;

import com.example.Medallia_login.Modelos.Medalla;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RepositorioMedallas extends MongoRepository<Medalla, ObjectId> {
    Optional<Medalla> findById(ObjectId id);
}
