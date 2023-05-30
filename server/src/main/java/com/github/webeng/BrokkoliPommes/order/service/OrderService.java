package com.github.webeng.BrokkoliPommes.order.service;

import com.github.webeng.BrokkoliPommes.order.domain.Order;
import com.github.webeng.BrokkoliPommes.order.repository.OrderRepository;
import com.github.webeng.BrokkoliPommes.user.domain.User;
import com.github.webeng.BrokkoliPommes.user.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;

    public OrderService(OrderRepository orderRepository, UserService userService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
    }

    @Override
    public List<Order> getAllOrders() {
        return this.orderRepository.findAll();
    }

    @Override
    public List<Order> getAllOrdersForUser(User user) {
        return orderRepository.getAllByUserOrderByDate(user);
    }

    @Override
    public List<Order> getAllOrdersForUser(Integer userId) {
        return getAllOrdersForUser(this.userService.getUser(userId));
    }
}
