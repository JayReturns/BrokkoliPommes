package com.github.webeng.BrokkoliPommes.order.domain;

import com.github.webeng.BrokkoliPommes.article.domain.Article;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class OrderPositionID implements Serializable {

    @ManyToOne
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;

    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    private Order order;

}
