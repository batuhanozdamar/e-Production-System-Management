package com.batuhanozdamar.eproductionTest.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class registrationRequest {
    @NotNull
    private String nameSurname;
    @NotNull
    private String username;
    @NotNull
    private String password;
    @NotNull
    private String email;
    @NotNull
    private String company;
}
