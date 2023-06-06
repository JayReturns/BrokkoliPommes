package com.github.webeng.BrokkoliPommes.order.domain;

import com.github.webeng.BrokkoliPommes.article.domain.Article;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "BP_ORDER_POSITION")
public class OrderPosition {

    @ManyToOne
    @JoinColumn(name = "ARTICLE_ID", nullable = false, updatable = false)
    private Article article;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", updatable = false, nullable = false, unique = true)
    private Integer id;

}
