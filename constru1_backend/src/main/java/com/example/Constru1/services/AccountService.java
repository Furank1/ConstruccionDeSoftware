package com.example.Constru1.services;

import com.example.Constru1.models.Account;
import com.example.Constru1.repositories.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepo accountRepo;

    public Optional<Account> login(String email, String password) {

        Optional<Account> account = accountRepo.findByEmail(email); //Encontrar la cuenta correspondiente al email

        if (account.isPresent() && account.get().getPassword().equals(password)) { //Validar que la pass dada sea la del email dado
            return account;
        }
        return Optional.empty(); //En caso de que no sea validada la pass, retornar un Optional vacio
    }
}
