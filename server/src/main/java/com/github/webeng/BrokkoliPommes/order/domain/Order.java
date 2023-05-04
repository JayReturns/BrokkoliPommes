package com.github.webeng.BrokkoliPommes.order.domain;

import com.github.webeng.BrokkoliPommes.user.domain.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Table(name = "BP_ORDER")
@Entity
@Getter
@Setter
public class Order implements Serializable {

    @Id
    @Column(name = "ID")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String oderID;

    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false, updatable = false)
    private User user;

    @Column(name = "date", nullable = false, updatable = false)
    private LocalDateTime date;

    @OneToMany
    private List<OrderPosition> orderPositions;

}
