package com.batuhanozdamar.eproductionTest.dto;

import com.batuhanozdamar.eproductionTest.entity.Company;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "CompanyProduct Data Transfer Object")
public class CompanyProductDto {

    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(required = true,value = "productCode")
    private String productCode;


    @ApiModelProperty(required = true,value = "company")
    private CompanyDto company;


    @ApiModelProperty(required = true,value = "product")
    private ProductDto product;

    @NotNull
    @ApiModelProperty(required = true, value = "Price Of Product")
    private double productPrice;

    @NotNull
    @ApiModelProperty(required = true, value = "Total Of Product")
    private double productAmount;

    @NotNull
    @ApiModelProperty(required = true, value = "Total Of Product")
    private String productColor;

    @ApiModelProperty(value = "Remained Number Of Product")
    private double stockOnHand;

}
