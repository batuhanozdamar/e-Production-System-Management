package com.batuhanozdamar.eproductionTest.service.implementation;

import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.entity.product;
import com.batuhanozdamar.eproductionTest.dto.ProductDto;
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
    public ProductDto save(ProductDto product) {
 /*   //    product productCheck = productRepository.getByProductCategory(product.getProductCategory());


        //if (productCheck != null)
          //  throw new IllegalArgumentException("Product Category Already Exist");
*/


        product p = modelMapper.map(product, product.class);
        //User user = userRepository.findByCompany(product.getUser());
        //p.setUser(user);
        //p.setCompany();
        p = productRepository.save(p);
        product.setId(p.getId());

        return product;
    }

    @Override
    public ProductDto getById(Long id) {
        product p = productRepository.getOne(id);
        return modelMapper.map(p, ProductDto.class);
    }

    //     düzenle
    @Override
    public ProductDto getByProductCategory(String productCategory) { return null; }

    //     düzenle
    @Override
    public List<ProductDto> getByProjectCategoryContains(String productName) { return null; }

    @Override
    public TPage<ProductDto> getAllPageable(Pageable pageable) {

        Page<product> data = productRepository.findAll(pageable);
        TPage<ProductDto> respnose = new TPage<ProductDto>();
        respnose.setStat(data, Arrays.asList(modelMapper.map(data.getContent(), ProductDto[].class)));
        return respnose;
    }

    @Override
    public Boolean delete(ProductDto product) { return null; }

    public Boolean delete(Long id) {
        productRepository.deleteById(id);
        return true;
    }

    @Override
    public ProductDto update(Long id, ProductDto product) {
        product productDb = productRepository.getOne(id);
        if (productDb == null)
            throw new IllegalArgumentException("Product Does Not Exist ID:" + id);

      /*  //product productCheck = productRepository.getByProductCategoryAndIdNot(product.getProductCategory(), id);
        //if (productCheck != null)
          //  throw new IllegalArgumentException("Product Category Already Exist");

        productDb.setProductCode(product.getProductCode());
        productDb.setProductName(product.getProductName());
        productDb.setProductCategory(product.getProductCategory());
        productDb.setProductPrice(product.getProductPrice());*/

        productDb.setProductCode(product.getProductCode());
        productDb.setProductName(product.getProductName());
        //productDb.setCategory(product.getCategory()); //düzelt

        productRepository.save(productDb);
        return modelMapper.map(productDb, ProductDto.class);
    }

    public List<ProductDto> getAll() {
        List<product> data = productRepository.findAll();
        return Arrays.asList(modelMapper.map(data, ProductDto[].class));
    }

    public List<ProductDto> getAllByUsername() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName);
        //List<product> data = productRepository.findByCompany(user);

        return null;//Arrays.asList(modelMapper.map(data, ProductDto[].class));
    }


}
