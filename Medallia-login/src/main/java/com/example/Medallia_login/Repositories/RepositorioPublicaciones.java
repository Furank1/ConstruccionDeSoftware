package com.example.Medallia_login.Repositories;

import com.example.Medallia_login.Modelos.Publicacion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioPublicaciones extends MongoRepository<Publicacion, String> {

}
