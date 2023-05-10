package com.github.webeng.BrokkoliPommes.user.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UserAlreadyExistsException extends IllegalArgumentException {

    public UserAlreadyExistsException(int userId) {
        super(String.format("User mit ID %d existiert bereits!", userId));
    }

    public UserAlreadyExistsException(String mail) {
        super(String.format("User mit Mail %s existert bereits", mail));
    }

}
