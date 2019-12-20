package com.batuhanozdamar.eproductionTest.service;

import com.batuhanozdamar.eproductionTest.dto.CategoryDto;
import com.batuhanozdamar.eproductionTest.dto.OfferDto;
import com.batuhanozdamar.eproductionTest.entity.Category;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {

    CategoryDto save(CategoryDto category);
    CategoryDto getById(Long id);
    CategoryDto getByCategoryName(String description);
    TPage<CategoryDto> getAllPageable(Pageable pageable);
    List<CategoryDto> getAll();
    Boolean delete(CategoryDto category);

    CategoryDto update(Long id, CategoryDto category);
}
