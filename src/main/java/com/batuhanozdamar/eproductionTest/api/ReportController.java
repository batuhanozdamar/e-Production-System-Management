package com.batuhanozdamar.eproductionTest.api;

import com.batuhanozdamar.eproductionTest.dto.CategoryDto;
import com.batuhanozdamar.eproductionTest.dto.ReportDto;
import com.batuhanozdamar.eproductionTest.service.implementation.ReportImpl;
import com.batuhanozdamar.eproductionTest.util.ApiPaths;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(ApiPaths.ReportCtrl.CTRL)
@Api(value = ApiPaths.ReportCtrl.CTRL, description = "Report APIs")
@CrossOrigin("http://localhost:4200")

public class ReportController {

    private final ReportImpl reportImpl;

    public ReportController(ReportImpl reportImpl) {
        this.reportImpl = reportImpl;
    }

    //Save Operation
    @PostMapping
    @ApiOperation(value = "Send Operation", response = CategoryDto.class)
    public ResponseEntity<ReportDto> sendMessage(@Valid @RequestBody ReportDto report) {
        return ResponseEntity.ok(reportImpl.save(report));
    }
}
