package com.batuhanozdamar.eproductionTest.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "User Data Transfer Object")
public class userDto {

    @ApiModelProperty(required = true,value = "ID")
    private Long id;

    @ApiModelProperty(required = true,value = "Name Surname")
    private String nameSurname;

    @ApiModelProperty(required = true,value = "User Name")
    private String username;

    @ApiModelProperty(required = true,value = "Password")
    private String password;

    @ApiModelProperty(required = true,value = "E-Mail")
    private String email;
}

