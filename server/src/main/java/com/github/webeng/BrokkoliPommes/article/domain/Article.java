package com.github.webeng.BrokkoliPommes.article.domain;

import com.github.webeng.BrokkoliPommes.user.domain.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "BP_ARTICLE")
@Getter
@Setter
public class Article implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ARTICLE_ID", updatable = false, nullable = false, unique = true)
    private Integer id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "CATEGORY")
    private String category;

    @Column(name = "price", nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "IMAGE", columnDefinition = "LONGTEXT")
    private String image;


}
