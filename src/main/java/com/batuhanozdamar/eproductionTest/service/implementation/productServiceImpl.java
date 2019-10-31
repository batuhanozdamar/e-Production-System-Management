package com.batuhanozdamar.eproductionTest.service.implementation;

import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.entity.product;
import com.batuhanozdamar.eproductionTest.dto.productDto;
import com.batuhanozdamar.eproductionTest.repository.productRepository;
import com.batuhanozdamar.eproductionTest.repository.userRepository;
import com.batuhanozdamar.eproductionTest.service.productService;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class productServiceImpl implements productService {

    private final productRepository productRepository;
    private final ModelMapper modelMapper;
    private final userRepository userRepository;

    public productServiceImpl(productRepository productRepository, userRepository userRepository, ModelMapper modelMapper) {
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
        this.userRepository= userRepository;
    }

    @Override
    public productDto save(productDto product) {
    //    product productCheck = productRepository.getByProductCategory(product.getProductCategory());

        //if (productCheck != null)
          //  throw new IllegalArgumentException("Product Category Already Exist");

        product p = modelMapper.map(product, product.class);
        User user = userRepository.findByUsername(product.getUsername());
        p.setCompany(user);

        p = productRepository.save(p);
        product.setId(p.getId());
        return product;
    }

    @Override
    public productDto getById(Long id) {
        product p = productRepository.getOne(id);
        return modelMapper.map(p, productDto.class);
    }

    //     düzenle
    @Override
    public productDto getByProductCategory(String productCategory) { return null; }

    //     düzenle
    @Override
    public List<productDto> getByProjectCategoryContains(String productName) { return null; }

    @Override
    public TPage<productDto> getAllPageable(Pageable pageable) {

        Page<product> data = productRepository.findAll(pageable);
        TPage<productDto> respnose = new TPage<productDto>();
        respnose.setStat(data, Arrays.asList(modelMapper.map(data.getContent(), productDto[].class)));
        return respnose;
    }


    @Override
    public Boolean delete(productDto product) { return null; }

    public Boolean delete(Long id) {
        productRepository.deleteById(id);
        return true;
    }

    @Override
    public productDto update(Long id, productDto product) {
        product productDb = productRepository.getOne(id);
        if (productDb == null)
            throw new IllegalArgumentException("Product Does Not Exist ID:" + id);

        //product productCheck = productRepository.getByProductCategoryAndIdNot(product.getProductCategory(), id);
        //if (productCheck != null)
          //  throw new IllegalArgumentException("Product Category Already Exist");

        productDb.setProductCode(product.getProductCode());
        productDb.setProductName(product.getProductName());
        productDb.setProductCategory(product.getProductCategory());
        productDb.setProductPrice(product.getProductPrice());

        productRepository.save(productDb);
        return modelMapper.map(productDb, productDto.class);
    }

    public List<productDto> getAll() {
        List<product> data = productRepository.findAll();
        return Arrays.asList(modelMapper.map(data, productDto[].class));
    }

    public List<productDto> getAllByUsername() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName);
        List<product> data = productRepository.findByCompany(user);
        return Arrays.asList(modelMapper.map(data, productDto[].class));
    }


}
