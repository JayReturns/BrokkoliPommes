package com.github.webeng.BrokkoliPommes.user.repository;

import com.github.webeng.BrokkoliPommes.user.api.UserData;
import com.github.webeng.BrokkoliPommes.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
