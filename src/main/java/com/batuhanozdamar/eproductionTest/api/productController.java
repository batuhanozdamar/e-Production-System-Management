package com.batuhanozdamar.eproductionTest.api;

import com.batuhanozdamar.eproductionTest.dto.ProductDto;
import com.batuhanozdamar.eproductionTest.entity.product;
import com.batuhanozdamar.eproductionTest.service.implementation.productServiceImpl;
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
@RequestMapping(ApiPaths.ProductCtrl.CTRL)
@Api(value = ApiPaths.ProductCtrl.CTRL, description = "Product APIs")
@CrossOrigin("http://localhost:4200")
public class productController {

        private final productServiceImpl productServiceImpl;

        public productController(productServiceImpl productServiceImpl) {
            this.productServiceImpl = productServiceImpl;
        }

        @GetMapping("/pagination")
        @ApiOperation(value = "Get By Pagination Operation", response = ProductDto.class)
        public ResponseEntity<TPage<ProductDto>> getAllByPagination(Pageable pageable) {
            TPage<ProductDto> data = productServiceImpl.getAllPageable(pageable);
            return ResponseEntity.ok(data);
        }

        @GetMapping()
        @ApiOperation(value = "Get All Operation", response = ProductDto.class , responseContainer = "List")
        public ResponseEntity<List<ProductDto>> getAll() {
            List<ProductDto> data = productServiceImpl.getAll();
            return ResponseEntity.ok(data);
        }

        @GetMapping("/{id}")
        @ApiOperation(value = "Get By Id Operation", response = ProductDto.class)
        public ResponseEntity<ProductDto> getById(@PathVariable(value = "id", required = true) Long id) {
            ProductDto issue = productServiceImpl.getById(id);
            return ResponseEntity.ok(issue);
        }

        @PostMapping
        @ApiOperation(value = "Create Operation", response = ProductDto.class)
        public ResponseEntity<ProductDto> createProduct(@Valid @RequestBody ProductDto product) {
            return ResponseEntity.ok(productServiceImpl.save(product));
        }

        @PutMapping("/{id}")
        @ApiOperation(value = "Update Operation", response = ProductDto.class)
        public ResponseEntity<ProductDto> updateProduct(@PathVariable(value = "id", required = true) Long id, @Valid @RequestBody ProductDto product) {
            return ResponseEntity.ok(productServiceImpl.update(id, product));
        }

        @DeleteMapping("/{id}")
        @ApiOperation(value = "Delete Operation", response = Boolean.class)
        public ResponseEntity<Boolean> delete(@PathVariable(value = "id", required = true) Long id) {
            return ResponseEntity.ok(productServiceImpl.delete(id));
        }

        @GetMapping("/generateWorkOrder/{id}")
        public ResponseEntity<List<product>> getByCategory(@PathVariable(value = "id", required = true) Long id) {
            List<product> issue = productServiceImpl.getByCategory(id);
            return ResponseEntity.ok(issue);
        }

}
