package com.batuhanozdamar.eproductionTest.dto;

import com.batuhanozdamar.eproductionTest.entity.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "Product Data Transfer Object")
public class OfferDto {

    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "companyProduct")
    private CompanyProductDto companyProductDto;

    @ApiModelProperty(required = true,value = "askedPrice")
    private double askedPrice;

    @ApiModelProperty(required = true,value = "askedAmount")
    private double askedAmount;

    @ApiModelProperty(required = true,value = "offerStatus")
    private OfferStatus offerStatus;

    @NotNull
    @ApiModelProperty(required = true,value = "Company")
    private CompanyDto companyDto;

    @ApiModelProperty(required = true, value = "soldAt")
    private Date soldAt;

    @ApiModelProperty(required = true, value = "rejectedAt")
    private Date rejectedAt;

    @ApiModelProperty(required = true, value = "offeredAt")
    private Date offeredAt;
}
