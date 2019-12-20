package com.batuhanozdamar.eproductionTest.api;

import com.batuhanozdamar.eproductionTest.dto.CategoryDto;
import com.batuhanozdamar.eproductionTest.dto.OfferDto;
import com.batuhanozdamar.eproductionTest.entity.Category;
import com.batuhanozdamar.eproductionTest.service.implementation.CategoryServiceImpl;
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
@RequestMapping(ApiPaths.CategoryCtrl.CTRL)
@Api(value = ApiPaths.CategoryCtrl.CTRL, description = "Category APIs")
@CrossOrigin("http://localhost:4200")
public class CategoryController {

    private final CategoryServiceImpl categoryServiceImpl;

    public CategoryController(CategoryServiceImpl categoryServiceImpl) {
        this.categoryServiceImpl = categoryServiceImpl;
    }

    //Get All Operation
    @GetMapping()
    @ApiOperation(value = "Get All Operation", response = CategoryDto.class , responseContainer = "List")
    public ResponseEntity<List<CategoryDto>> getAll() {
        List<CategoryDto> data = categoryServiceImpl.getAll();
        return ResponseEntity.ok(data);
    }

    //Save Operation
    @PostMapping
    @ApiOperation(value = "Create Operation", response = CategoryDto.class)
    public ResponseEntity<CategoryDto> createProduct(@Valid @RequestBody CategoryDto category) {
        return ResponseEntity.ok(categoryServiceImpl.save(category));
    }

    //Update Operation
    @PutMapping("/{id}")
    @ApiOperation(value = "Update Operation", response = CategoryDto.class)
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable(value = "id", required = true) Long id, @Valid @RequestBody CategoryDto category) {
        return ResponseEntity.ok(categoryServiceImpl.update(id, category));
    }

    //Delete Operation
    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete Operation", response = Boolean.class)
    public ResponseEntity<Boolean> delete(@PathVariable(value = "id", required = true) Long id) {
        return ResponseEntity.ok(categoryServiceImpl.delete(id));
    }

}
