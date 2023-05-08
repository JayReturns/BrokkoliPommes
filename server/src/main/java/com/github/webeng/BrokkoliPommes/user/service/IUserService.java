package com.github.webeng.BrokkoliPommes.user.service;

import com.github.webeng.BrokkoliPommes.user.domain.User;

public interface IUserService {

    // TODO: REMOVE
    User createUserWithHash(User user);
    User createUser(User user);

    boolean hasValidCredentials(User user);

}
