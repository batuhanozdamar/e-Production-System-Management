package com.batuhanozdamar.eproductionTest.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "Product Data Transfer Object")
public class offerDto {

    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "Product ID")
    private Long productId;

    @NotNull
    @ApiModelProperty(required = true, value = "Name Of Product")
    private String productName;

    @NotNull
    @ApiModelProperty(required = true, value = "Code Of Product")
    private String productCode;

    @NotNull
    @ApiModelProperty(required = true, value = "Category Of Product")
    private String productCategory;

    @NotNull
    @ApiModelProperty(required = true, value = "Price Of Product")
    private double productPrice;

    @ApiModelProperty(required = true,value = "askedPrice")
    private double askedPrice;

    @NotNull
    @ApiModelProperty(required = true,value = "Username")
    private String username;


    @ApiModelProperty(required = true,value = "company")
    private userDto company;
}
