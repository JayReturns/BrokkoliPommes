package com.github.webeng.BrokkoliPommes.shared.service;

import com.google.common.hash.Hashing;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
public class PasswordCryptoService implements IPasswordCryptoService {

    @Override
    public String hashPassword(String plainPassword) {
        return Hashing.sha256()
                .hashString(plainPassword, StandardCharsets.UTF_8)
                .toString();
    }

}
