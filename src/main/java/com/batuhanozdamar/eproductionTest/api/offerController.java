package com.batuhanozdamar.eproductionTest.api;

import com.batuhanozdamar.eproductionTest.dto.OfferDto;
import com.batuhanozdamar.eproductionTest.service.implementation.offerServiceImpl;
import com.batuhanozdamar.eproductionTest.util.ApiPaths;
import com.batuhanozdamar.eproductionTest.util.TPage;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(ApiPaths.OfferCtrl.CTRL)
@Api(value = ApiPaths.OfferCtrl.CTRL, description = "Offer APIs")
@CrossOrigin("http://localhost:4200")
public class offerController {

    private final offerServiceImpl offerServiceImpl;

    public offerController(offerServiceImpl offerServiceImpl) {
        this.offerServiceImpl = offerServiceImpl;
    }

    @GetMapping("/pagination")
    @ApiOperation(value = "Get By Pagination Operation", response = OfferDto.class)
    public ResponseEntity<TPage<OfferDto>> getAllByPagination(Pageable pageable) {
        TPage<OfferDto> data = offerServiceImpl.getAllPageable(pageable);
        return ResponseEntity.ok(data);
    }

    @GetMapping()
    @ApiOperation(value = "Get All Operation", response = OfferDto.class , responseContainer = "List")
    public ResponseEntity<List<OfferDto>> getAll() {
        List<OfferDto> data = offerServiceImpl.getAllByUsername();
        return ResponseEntity.ok(data);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "Get By Id Operation", response = OfferDto.class)
    public ResponseEntity<OfferDto> getById(@PathVariable(value = "id", required = true) Long id) {
        OfferDto offer = offerServiceImpl.getById(id);
        return ResponseEntity.ok(offer);
    }

    @GetMapping("/offeredItems/{id}")
    @ApiOperation(value = "Get By Id Operation", response = OfferDto.class)
    public ResponseEntity<List<OfferDto>> getByCompanyId(@PathVariable(value = "id", required = true) Long id) {
        String itemType = "recieved";
        List<OfferDto> offer = offerServiceImpl.getByCompanyId(id, itemType);
        return ResponseEntity.ok(offer);
    }


    @GetMapping("/getOffers")
    @ApiOperation(value = "Get By Id Operation", response = OfferDto.class)
    public ResponseEntity<List<OfferDto>> getOffers(
            @RequestParam(required = false) Long statusId,
            @RequestParam(required = false) Long productCompanyId,
            @RequestParam(required = false) Long offerCompanyId
         ) {
        List<OfferDto> offer = offerServiceImpl.getOffers(statusId, productCompanyId, offerCompanyId);
        return ResponseEntity.ok(offer);
    }




    @PostMapping
    @ApiOperation(value = "Create Operation", response = OfferDto.class)
    public ResponseEntity<OfferDto> createProduct(@Valid @RequestBody OfferDto offer) {
        return ResponseEntity.ok(offerServiceImpl.save(offer));
    }

    @PostMapping("/gwo")
    @ApiOperation(value = "Create Operation", response = OfferDto.class)
    public void createOfferList(@Valid @RequestBody OfferDto[] offerList) {
        for (OfferDto offer: offerList)
        {
            ResponseEntity.ok(offerServiceImpl.save(offer));
        }
    }

  /*  @PostMapping("/rejectedItems")
    @ApiOperation(value = "Alter Status", response = OfferDto.class)
    public ResponseEntity<OfferDto> deleteOffer(@Valid @RequestBody OfferDto offer) {
        return ResponseEntity.ok(offerServiceImpl.saveD(offer));
    }*/

    @PutMapping("/{id}")
    @ApiOperation(value = "Update Operation", response = OfferDto.class)
    public ResponseEntity<OfferDto> updateProduct(@PathVariable(value = "id", required = true) Long id, @Valid @RequestBody OfferDto offer) {
        return ResponseEntity.ok(offerServiceImpl.update(id, offer));
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete Operation", response = Boolean.class)
    public ResponseEntity<Boolean> delete(@PathVariable(value = "id", required = true) Long id) {
        return ResponseEntity.ok(offerServiceImpl.delete(id));
    }


    @GetMapping("/rejectOffer/{id}")
    @ApiOperation(value = "Get By Id Operation")
    public void rejectOffer(@PathVariable(value = "id", required = true) Long id) {
        offerServiceImpl.rejectOffer(id);
    }


    @GetMapping("/acceptOffer/{id}")
    @ApiOperation(value = "Get By Id Operation")
    public void acceptOffer(@PathVariable(value = "id", required = true) Long id) {
        offerServiceImpl.accepOffer(id);
    }
}
