package com.batuhanozdamar.eproductionTest.service;

import com.batuhanozdamar.eproductionTest.dto.ProductDto;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface productService {

    ProductDto save(ProductDto product);

    ProductDto getById(Long id);

    ProductDto getByProductCategory(String productCategory);

    List<ProductDto> getByProjectCategoryContains(String productCategory);

    TPage<ProductDto> getAllPageable(Pageable pageable);

    List<ProductDto> getAllByUsername();

    List<ProductDto> getAll();

    Boolean delete(ProductDto product);

    ProductDto update(Long id, ProductDto product);
}
