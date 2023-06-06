package com.github.webeng.BrokkoliPommes.order.service;

import com.github.webeng.BrokkoliPommes.order.domain.Order;
import com.github.webeng.BrokkoliPommes.user.domain.User;

import java.util.List;

public interface IOrderService {

    List<Order> getAllOrders();

    List<Order> getAllOrdersForUser(User user);
    List<Order> getAllOrdersForUser(Integer userId);

    Order createOrder(Order order, Integer userId);
}
