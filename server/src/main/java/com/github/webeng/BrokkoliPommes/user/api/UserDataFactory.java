package com.github.webeng.BrokkoliPommes.user.api;

import com.github.webeng.BrokkoliPommes.user.domain.User;
import org.springframework.stereotype.Component;

@Component
public class UserDataFactory {

    public UserData from(User user) {
        UserData data = new UserData();

        data.setId(user.getId());
        data.setName(user.getName());
        data.setMail(user.getMail());
        data.setPassword(user.getPassword());
        data.setIsSupplier(user.getIsSupplier());
        data.setCompanyName(user.getCompanyName());

        return data;
    }

}
