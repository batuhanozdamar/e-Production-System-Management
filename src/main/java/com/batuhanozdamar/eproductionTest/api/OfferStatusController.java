package com.batuhanozdamar.eproductionTest.api;

import com.batuhanozdamar.eproductionTest.dto.CategoryDto;
import com.batuhanozdamar.eproductionTest.dto.OfferStatusDto;
import com.batuhanozdamar.eproductionTest.entity.OfferStatus;
import com.batuhanozdamar.eproductionTest.service.implementation.CategoryServiceImpl;
import com.batuhanozdamar.eproductionTest.service.implementation.OfferStatusServiceImpl;
import com.batuhanozdamar.eproductionTest.util.ApiPaths;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(ApiPaths.OfferStatusCtrl.CTRL)
@Api(value = ApiPaths.OfferStatusCtrl.CTRL, description = "OfferStatus APIs")
@CrossOrigin("http://localhost:4200")
public class OfferStatusController {

    private final OfferStatusServiceImpl offerStatusServiceImpl;

    public OfferStatusController(OfferStatusServiceImpl offerStatusServiceImpl) {
        this.offerStatusServiceImpl = offerStatusServiceImpl;
    }

    //Get All Operation
    @GetMapping()
    @ApiOperation(value = "Get All Operation", response = OfferStatusDto.class , responseContainer = "List")
    public ResponseEntity<List<OfferStatusDto>> getAll() {
        List<OfferStatusDto> data = offerStatusServiceImpl.getAll();
        return ResponseEntity.ok(data);
    }

    //Get By StatusId  Operation
    /*@GetMapping()
    @ApiOperation(value = "Get All Operation", response = OfferStatusDto.class , responseContainer = "List")
    public ResponseEntity<List<OfferStatusDto>> getAll() {
        List<OfferStatusDto> data = offerStatusServiceImpl.getAll();
        return ResponseEntity.ok(data);
    }*/

    //Update Operation
    @PutMapping("/{id}")
    @ApiOperation(value = "Update Operation", response = CategoryDto.class)
    public ResponseEntity<OfferStatusDto> updateOfferStatus(@PathVariable(value = "id", required = true) Long id, @Valid @RequestBody OfferStatusDto offerStatus) {
        return ResponseEntity.ok(offerStatusServiceImpl.update(id, offerStatus));
    }


}
