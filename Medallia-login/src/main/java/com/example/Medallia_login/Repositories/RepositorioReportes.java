package com.example.Medallia_login.Repositories;

import com.example.Medallia_login.Modelos.Reporte;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioReportes extends MongoRepository<Reporte, ObjectId> {
}
