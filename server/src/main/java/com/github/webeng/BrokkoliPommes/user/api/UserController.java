package com.github.webeng.BrokkoliPommes.user.api;

import com.github.webeng.BrokkoliPommes.user.domain.User;
import com.github.webeng.BrokkoliPommes.user.domain.UserFactory;
import com.github.webeng.BrokkoliPommes.user.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "user")
public class UserController {

    private final IUserService userService;
    private final UserFactory userFactory;
    private final UserDataFactory userDataFactory;

    public UserController(IUserService userService, UserFactory userFactory, UserDataFactory userDataFactory) {
        this.userService = userService;
        this.userFactory = userFactory;
        this.userDataFactory = userDataFactory;
    }

    @Operation(summary = "Register User")
    @PostMapping(path = "register",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public UserData createUser(@Valid @RequestBody UserData userData) {
        return userDataFactory.from(userService.createUser(userFactory.from(userData)));
    }

    @Operation(summary = "Log User in. Returns user on success, null otherwise")
    @PostMapping(path = "login")
    public User isLoggedIn(@RequestBody UserData userData) {
        return userService.hasValidCredentials(userFactory.from(userData));
    }

    @Operation(summary = "Get User details")
    @GetMapping(path = "{mail}")
    public User getDetails(@PathVariable String mail) {
        return userService.getUser(mail);
    }

}
