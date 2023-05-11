package com.github.webeng.BrokkoliPommes.user.service;

import com.github.webeng.BrokkoliPommes.user.api.exceptions.UserAlreadyExistsException;
import com.github.webeng.BrokkoliPommes.user.domain.User;
import com.github.webeng.BrokkoliPommes.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        if (Objects.isNull(user.getIsSupplier())) {
            user.setIsSupplier(false);
        }
        if (userRepository.findByMail(user.getMail()).isPresent()) {
            throw new UserAlreadyExistsException(user.getMail());
        }
        if (!Objects.isNull(user.getId())) {
            if (userRepository.existsById(user.getId())) {
                throw new UserAlreadyExistsException(user.getId());
            }
        }
        return userRepository.save(user);
    }

    @Override
    public boolean hasValidCredentials(User user) {
        Optional<User> optionalUser = userRepository.findByMail(user.getMail());
        if (optionalUser.isEmpty())
            return false;
        User fromRepo = optionalUser.get();
        return fromRepo.getPassword().equals(user.getPassword());
    }
}
