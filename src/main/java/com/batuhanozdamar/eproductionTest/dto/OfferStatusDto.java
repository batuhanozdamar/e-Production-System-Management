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
@ApiModel(value = "OfferStatus Data Transfer Object")

public class OfferStatusDto {

    @ApiModelProperty(value = "Product ID")
    private Long id;

    @NotNull
    @ApiModelProperty(required = true, value = "Name Of Product")
    private String name;
}
