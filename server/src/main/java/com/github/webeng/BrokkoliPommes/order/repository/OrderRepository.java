package com.github.webeng.BrokkoliPommes.order.repository;

import com.github.webeng.BrokkoliPommes.order.domain.Order;
import com.github.webeng.BrokkoliPommes.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    List<Order> getAllByUserOrderByDateDesc(User user);

}
