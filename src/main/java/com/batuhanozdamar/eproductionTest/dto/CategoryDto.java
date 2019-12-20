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
@ApiModel(value = "Category Data Transfer Object")
public class CategoryDto {

    @ApiModelProperty(value = "Product ID")
    private Long value;

    @NotNull
    @ApiModelProperty(required = true, value = "Description Of Product")
    private String title;
}
