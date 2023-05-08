package com.github.webeng.BrokkoliPommes.user.api;

import com.github.webeng.BrokkoliPommes.user.domain.UserFactory;
import com.github.webeng.BrokkoliPommes.user.service.IUserService;
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

    /**
     * Hash password in backend. Expects non-hashed password
     * @param userData
     * @return
     */
    @PostMapping(path = "hash/register",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public UserData createUserWithHash(@Valid @RequestBody UserData userData) {
        return userDataFactory.from(userService.createUserWithHash(userFactory.from(userData)));
    }

    /**
     * Hash password in frontend. Excepts hashed password
     * @param userData
     * @return
     */
    @PostMapping(path = "register",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public UserData createUser(@Valid @RequestBody UserData userData) {
        return userDataFactory.from(userService.createUser(userFactory.from(userData)));
    }

    @GetMapping(path = "login")
    public Boolean isLoggedIn(@RequestBody UserData userData) {
        return userService.hasValidCredentials(userFactory.from(userData));
    }

}
