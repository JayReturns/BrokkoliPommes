package com.github.webeng.BrokkoliPommes.user.domain;

import com.github.webeng.BrokkoliPommes.user.api.UserData;
import org.springframework.stereotype.Component;

@Component
public class UserFactory {

    public User from(UserData data) {
        User user = new User();
        user.setId(data.getId());
        user.setName(data.getName());
        user.setIsSupplier(data.getIsSupplier());
        user.setMail(data.getMail());
        user.setPassword(data.getPassword());
        user.setCompanyName(data.getCompanyName());

        return user;
    }

}
