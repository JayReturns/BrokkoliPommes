package com.github.webeng.BrokkoliPommes.order.api;

import com.github.webeng.BrokkoliPommes.user.domain.User;
import lombok.Data;

import javax.validation.constraints.FutureOrPresent;
import java.time.LocalDateTime;

@Data
public class OrderData {

    private String orderId;
    private User user;
    @FutureOrPresent
    private LocalDateTime date;

}
