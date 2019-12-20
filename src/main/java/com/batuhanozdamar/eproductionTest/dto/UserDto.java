package com.batuhanozdamar.eproductionTest.dto;

import com.batuhanozdamar.eproductionTest.entity.product;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "User Data Transfer Object")
public class UserDto {

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

    @ApiModelProperty(required = true,value = "Admin Role")
    private boolean isAdmin;

    @ApiModelProperty(required = true,value = "role")
    private RoleDto role;

    @ApiModelProperty(required = true,value = "company")
    private CompanyDto company;
}


