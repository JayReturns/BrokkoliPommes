package com.github.webeng.BrokkoliPommes.user.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "BP_USER")
@Getter
@Setter
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", updatable = false, nullable = false, unique = true)
    private Integer id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "MAIL", nullable = false)
    private String mail;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "IS_SUPPLIER", nullable = false)
    private Boolean isSupplier = false;

    @Column(name = "COMPANY_NAME")
    private String companyName;

}
