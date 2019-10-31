package com.batuhanozdamar.eproductionTest.service;

import com.batuhanozdamar.eproductionTest.dto.productDto;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface productService {

    productDto save(productDto product);

    productDto getById(Long id);

    productDto getByProductCategory(String productCategory);

    List<productDto> getByProjectCategoryContains(String productCategory);

    TPage<productDto> getAllPageable(Pageable pageable);

    List<productDto> getAllByUsername();

    List<productDto> getAll();

    Boolean delete(productDto product);

    productDto update(Long id, productDto product);
}
