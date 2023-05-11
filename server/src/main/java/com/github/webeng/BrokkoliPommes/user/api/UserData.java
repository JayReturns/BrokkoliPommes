package com.github.webeng.BrokkoliPommes.user.api;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class UserData {

    private Integer id;
    @NotBlank
    private String name;
    @NotBlank
    @Email
    private String mail;
    @NotBlank
    @Size(min =  6)
    private String password;
    private Boolean isSupplier;
    private String companyName;

}
