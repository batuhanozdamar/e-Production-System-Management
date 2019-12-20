package com.batuhanozdamar.eproductionTest.api;

import com.batuhanozdamar.eproductionTest.dto.CategoryDto;
import com.batuhanozdamar.eproductionTest.dto.CompanyProductDto;
import com.batuhanozdamar.eproductionTest.entity.CompanyProduct;
import com.batuhanozdamar.eproductionTest.service.CompanyProductService;
import com.batuhanozdamar.eproductionTest.service.implementation.CategoryServiceImpl;
import com.batuhanozdamar.eproductionTest.service.implementation.CompanyProductImpl;
import com.batuhanozdamar.eproductionTest.service.implementation.offerServiceImpl;
import com.batuhanozdamar.eproductionTest.util.ApiPaths;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(ApiPaths.CompanyProductCtrl.CTRL)
@Api(value = ApiPaths.CompanyProductCtrl.CTRL, description = "CompanyProduct APIs")
@CrossOrigin("http://localhost:4200")
public class CompanyProductController {

    private final CompanyProductImpl companyProductImpl;

    public CompanyProductController(CompanyProductImpl companyProductImpl) {
        this.companyProductImpl = companyProductImpl;
    }

    //Get All Operation
    @GetMapping()
    @ApiOperation(value = "Get All Operation", response = CompanyProductDto.class , responseContainer = "List")
    public ResponseEntity<List<CompanyProductDto>> getAll() {
        List<CompanyProductDto> data = companyProductImpl.getAll();
        return ResponseEntity.ok(data);
    }

    //Save Operation
    @PostMapping
    @ApiOperation(value = "Create Operation", response = CompanyProductDto.class)
    public ResponseEntity<CompanyProductDto> createProduct(@Valid @RequestBody CompanyProductDto companyProduct) {
        return ResponseEntity.ok(companyProductImpl.save(companyProduct));
    }

    //Update Operation
    @PutMapping("/{id}")
    @ApiOperation(value = "Update Operation", response = CompanyProductDto.class)
    public ResponseEntity<CompanyProductDto> updateCompanyProduct(@PathVariable(value = "id", required = true) Long id, @Valid @RequestBody CompanyProductDto companyProduct) {
        return ResponseEntity.ok(companyProductImpl.update(id, companyProduct));
    }

    //Delete Operation
    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete Operation", response = Boolean.class)
    public ResponseEntity<Boolean> delete(@PathVariable(value = "id", required = true) Long id) {
        return ResponseEntity.ok(companyProductImpl.delete(id));
    }
}
