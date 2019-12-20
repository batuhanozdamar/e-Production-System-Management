package com.batuhanozdamar.eproductionTest.api;

import com.batuhanozdamar.eproductionTest.dto.ProductDto;
import com.batuhanozdamar.eproductionTest.service.implementation.productServiceImpl;
import com.batuhanozdamar.eproductionTest.util.ApiPaths;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.ProductAllCtrl.CTRL)
@Api(value = ApiPaths.ProductAllCtrl.CTRL, description = "Product All APIs")
@CrossOrigin("http://localhost:4200")

public class productAllController {

    private final productServiceImpl productServiceImpl;

    public productAllController(productServiceImpl productServiceImpl) {
        this.productServiceImpl = productServiceImpl;
    }

    @GetMapping()
    @ApiOperation(value = "Get All Operation", response = ProductDto.class , responseContainer = "List")
    public ResponseEntity<List<ProductDto>> getAll() {
        List<ProductDto> data = productServiceImpl.getAll();
        return ResponseEntity.ok(data);
    }




}
