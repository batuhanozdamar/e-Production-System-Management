package com.batuhanozdamar.eproductionTest.dto;

import com.batuhanozdamar.eproductionTest.entity.CompanyProduct;
import com.batuhanozdamar.eproductionTest.entity.OfferStatus;
import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.entity.product;
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
public class OfferDto {

    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "companyProduct")
    private CompanyProduct companyProduct;

    @NotNull
    @ApiModelProperty(required = true, value = "Name Of Product")
    private product productName;

    @NotNull
    @ApiModelProperty(required = true, value = "Code Of Product")
    private product productCode;

    @NotNull
    @ApiModelProperty(required = true, value = "Category Of Product")
    private product productCategory;

    @NotNull
    @ApiModelProperty(required = true, value = "Price Of Product")
    private product productPrice;

    @ApiModelProperty(required = true,value = "askedPrice")
    private product askedPrice;

    @ApiModelProperty(required = true,value = "offerStatus")
    private OfferStatus offerStatus;

    @NotNull
    @ApiModelProperty(required = true,value = "user")
    private User user;

    @ApiModelProperty(required = true,value = "company")
    private UserDto company;
}
