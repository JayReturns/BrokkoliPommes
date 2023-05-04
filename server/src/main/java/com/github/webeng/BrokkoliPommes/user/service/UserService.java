package com.github.webeng.BrokkoliPommes.user.service;

import com.github.webeng.BrokkoliPommes.shared.service.IPasswordCryptoService;
import com.github.webeng.BrokkoliPommes.user.api.exceptions.UserAlreadyExistsException;
import com.github.webeng.BrokkoliPommes.user.domain.User;
import com.github.webeng.BrokkoliPommes.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final IPasswordCryptoService passwordCryptoService;

    public UserService(UserRepository userRepository, IPasswordCryptoService passwordCryptoService) {
        this.userRepository = userRepository;
        this.passwordCryptoService = passwordCryptoService;
    }

    @Override
    public User createUser(User user) {
        // TODO: Password Hashing in Frontend!
        user.setPassword(passwordCryptoService.hashPassword(user.getPassword()));
        if (Objects.isNull(user.getIsSupplier())) {
            user.setIsSupplier(false);
        }
        if (!Objects.isNull(user.getId())) {
            if (userRepository.existsById(user.getId())) {
                throw new UserAlreadyExistsException(user.getId());
            }
        }
        return userRepository.save(user);
    }
}
