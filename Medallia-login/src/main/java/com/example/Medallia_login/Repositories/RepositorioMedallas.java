package com.example.Medallia_login.Repositories;

import com.example.Medallia_login.Modelos.Medalla;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioMedallas extends MongoRepository<Medalla, ObjectId> {
}
