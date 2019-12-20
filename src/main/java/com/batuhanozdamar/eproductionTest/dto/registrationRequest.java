package com.batuhanozdamar.eproductionTest.dto;

import lombok.Data;

@Data
public class registrationRequest {
    private String nameSurname;
    private String username;
    private String password;
    private String email;
    private String company;
}
