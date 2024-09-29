package com.example.Constru1.repositories;

import com.example.Constru1.models.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AccountRepo extends MongoRepository<Account, String> {
    Optional<Account> findByEmail(String email);
}
