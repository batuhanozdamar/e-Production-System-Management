package com.batuhanozdamar.eproductionTest.dto;

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
@ApiModel(value = "Company Data Transfer Object")
public class CompanyDto {

    @ApiModelProperty(value = "id")
    private Long id;

    @NotNull
    @ApiModelProperty(required = true, value = "Name Of Company")
    private String companyName;
}
