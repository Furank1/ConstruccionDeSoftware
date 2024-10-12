package com.example.Medallia_login.Repositories;

import com.example.Medallia_login.Modelos.Medalla;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RepositorioMedallas extends MongoRepository<Medalla, ObjectId> {

}
