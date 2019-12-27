package com.batuhanozdamar.eproductionTest.service.implementation;

import com.batuhanozdamar.eproductionTest.dto.CategoryDto;
import com.batuhanozdamar.eproductionTest.dto.OfferDto;
import com.batuhanozdamar.eproductionTest.dto.ProductDto;
import com.batuhanozdamar.eproductionTest.dto.UserDto;
import com.batuhanozdamar.eproductionTest.entity.Category;
import com.batuhanozdamar.eproductionTest.entity.OfferStatus;
import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.entity.product;
import com.batuhanozdamar.eproductionTest.repository.CategoryRepository;
import com.batuhanozdamar.eproductionTest.repository.offerRepository;
import com.batuhanozdamar.eproductionTest.repository.userRepository;
import com.batuhanozdamar.eproductionTest.service.CategoryService;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;
    private final userRepository userRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, userRepository userRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
        this.userRepository= userRepository;
    }

    @Override
    public CategoryDto save(CategoryDto category) {

        Category c = modelMapper.map(category, Category.class);
        /*User user = userRepository.getOne(category.getId());
        c.setId(user);*/

        c = categoryRepository.save(c);
        category.setValue(c.getValue());
        return category;
    }

    @Override
    public CategoryDto getById(Long id) {

        Category c = categoryRepository.getOne(id);
        return modelMapper.map(c, CategoryDto.class);
    }

    @Override
    public CategoryDto getByCategoryName(String description) {
        return null;
    }

    @Override
    public TPage<CategoryDto> getAllPageable(Pageable pageable) {
        return null;
    }

    @Override
    public List<CategoryDto> getAll() {
        List<Category> data = categoryRepository.findAll();
        return Arrays.asList(modelMapper.map(data, CategoryDto[].class));
    }

    @Override
    public Boolean delete(CategoryDto category) {
        return null;
    }

    @Override
    public CategoryDto update(Long id, CategoryDto category) {

        Category categoryDb = categoryRepository.getOne(id);
        categoryDb.setTitle(category.getTitle());

        categoryRepository.save(categoryDb);
        return modelMapper.map(categoryDb, CategoryDto.class);
    }

    //Delete Operation Here...
    public Boolean delete(Long categoryID) {
        categoryRepository.deleteById(categoryID);
        return true;
    }

}
