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
public class ProductDto {

    @ApiModelProperty(value = "Product ID")
    private Long id;

    @NotNull
    @ApiModelProperty(required = true, value = "Name Of Product")
    private String productName;

    @NotNull
    @ApiModelProperty(required = true, value = "Code Of Product")
    private String productCode;

    @NotNull
    @ApiModelProperty(required = true, value = "Category Of Product")
    private CategoryDto category;



}
