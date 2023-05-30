package com.github.webeng.BrokkoliPommes.user.service;

import com.github.webeng.BrokkoliPommes.user.domain.User;

public interface IUserService {

    User createUser(User user);

    User hasValidCredentials(User user);

    User getUser(Integer userId);

    User getUser(String mail);

}
