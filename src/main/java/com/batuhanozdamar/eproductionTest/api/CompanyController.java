package com.batuhanozdamar.eproductionTest.api;

import com.batuhanozdamar.eproductionTest.dto.CategoryDto;
import com.batuhanozdamar.eproductionTest.dto.CompanyDto;
import com.batuhanozdamar.eproductionTest.entity.Company;
import com.batuhanozdamar.eproductionTest.service.implementation.CategoryServiceImpl;
import com.batuhanozdamar.eproductionTest.service.implementation.CompanyServiceImpl;
import com.batuhanozdamar.eproductionTest.util.ApiPaths;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(ApiPaths.CompanyCtrl.CTRL)
@Api(value = ApiPaths.CompanyCtrl.CTRL, description = "Company APIs")
@CrossOrigin("http://localhost:4200")
public class CompanyController {

    private final CompanyServiceImpl companyServiceImpl;

    public CompanyController(CompanyServiceImpl companyServiceImpl) {
        this.companyServiceImpl = companyServiceImpl;
    }

    //Get All Operation
    @GetMapping()
    @ApiOperation(value = "Get All Operation", response = CompanyDto.class , responseContainer = "List")
    public ResponseEntity<List<CompanyDto>> getAll() {
        List<CompanyDto> data = companyServiceImpl.getAll();
        return ResponseEntity.ok(data);
    }

    //Save Operation
    @PostMapping
    @ApiOperation(value = "Create Operation", response = CompanyDto.class)
    public ResponseEntity<CompanyDto> createProduct(@Valid @RequestBody CompanyDto company) {
        return ResponseEntity.ok(companyServiceImpl.save(company));
    }

    //Delete Operation
    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete Operation", response = Boolean.class)
    public ResponseEntity<Boolean> delete(@PathVariable(value = "id", required = true) Long id) {
        return ResponseEntity.ok(companyServiceImpl.delete(id));
    }
}
