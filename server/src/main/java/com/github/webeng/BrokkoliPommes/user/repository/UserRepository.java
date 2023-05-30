package com.github.webeng.BrokkoliPommes.user.repository;

import com.github.webeng.BrokkoliPommes.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByMailIgnoreCase(String mail);

}
