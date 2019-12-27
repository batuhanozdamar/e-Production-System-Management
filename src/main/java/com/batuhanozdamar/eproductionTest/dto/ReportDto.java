package com.batuhanozdamar.eproductionTest.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "Report Data Transfer Object")

public class ReportDto {

    @ApiModelProperty(value = "Report ID")
    private Long id;

    @ApiModelProperty(required = true, value = "Name Surname")
    private String nameSurname;

    @ApiModelProperty(required = true, value = "Email")
    private String email;

    @ApiModelProperty(required = true, value = "Subject")
    private String subject;

    @ApiModelProperty(required = true, value = "Message")
    private String message;

    @ApiModelProperty(required = true, value = "sentDate")
    private Date sentDate;
}
