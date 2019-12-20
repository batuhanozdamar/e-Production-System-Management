package com.batuhanozdamar.eproductionTest.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "Role User Transfer Object")
public class RoleDto {

    @ApiModelProperty(required = true,value = "ID")
    private Long id;

    @ApiModelProperty(required = true,value = "Name")
    private String name;
}
