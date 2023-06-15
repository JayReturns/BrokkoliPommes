package com.github.webeng.BrokkoliPommes.order.api;

import com.github.webeng.BrokkoliPommes.order.domain.Order;
import com.github.webeng.BrokkoliPommes.order.service.IOrderService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "order")
@CrossOrigin
public class OrderController {

    private final IOrderService orderService;

    public OrderController(IOrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Order> getAllOrders() {
        return this.orderService.getAllOrders();
    }

    @GetMapping(path = "{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Order> getAllOrdersForUser(@PathVariable Integer userId) {
        return orderService.getAllOrdersForUser(userId);
    }

    @PostMapping(path = "create/{userId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Order createOrder(@RequestBody Order order, @PathVariable Integer userId) {
        System.out.println(order.toString());
        return orderService.createOrder(order, userId);
    }

}
