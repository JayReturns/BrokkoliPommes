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
        if (userRepository.findByMailIgnoreCase(user.getMail()).isPresent()) {
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
    public User hasValidCredentials(User user) {
        Optional<User> optionalUser = userRepository.findByMailIgnoreCase(user.getMail());
        if (optionalUser.isEmpty())
            return null;
        User fromRepo = optionalUser.get();
        if (fromRepo.getPassword().equals(user.getPassword())) {
            return fromRepo;
        } else {
            return null;
        }
    }

    @Override
    public User getUser(Integer userId) {
        return userRepository.findById(userId).orElseThrow();
    }

    @Override
    public User getUser(String mail) {
        return userRepository.findByMailIgnoreCase(mail).orElseThrow();
    }

    @Override
    public User updateUser(Integer id, User user) {
        User userFromDB = userRepository.findById(id).orElseThrow();
        userFromDB.setMail(user.getMail());
        userFromDB.setPassword(user.getPassword());
        userFromDB.setIsSupplier(user.getIsSupplier());
        userFromDB.setCompanyName(user.getCompanyName());
        userFromDB.setName(user.getName());
        return userRepository.save(userFromDB);
    }

}
