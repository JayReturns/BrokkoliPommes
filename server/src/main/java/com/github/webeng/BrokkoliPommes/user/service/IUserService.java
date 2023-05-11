package com.github.webeng.BrokkoliPommes.user.service;

import com.github.webeng.BrokkoliPommes.user.domain.User;

public interface IUserService {

    User createUser(User user);

    boolean hasValidCredentials(User user);

}
