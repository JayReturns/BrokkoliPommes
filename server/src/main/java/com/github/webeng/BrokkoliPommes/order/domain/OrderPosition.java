package com.github.webeng.BrokkoliPommes.order.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "BP_ORDER_POSITION")
public class OrderPosition {

    @EmbeddedId
    private OrderPositionID orderPositionID;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;


}
