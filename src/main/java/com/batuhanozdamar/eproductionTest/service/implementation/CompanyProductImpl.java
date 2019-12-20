package com.batuhanozdamar.eproductionTest.service.implementation;

import com.batuhanozdamar.eproductionTest.dto.CompanyProductDto;
import com.batuhanozdamar.eproductionTest.entity.CompanyProduct;
import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.repository.CompanyProductRepository;
import com.batuhanozdamar.eproductionTest.repository.userRepository;
import com.batuhanozdamar.eproductionTest.service.CompanyProductService;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
@Service
public class CompanyProductImpl implements CompanyProductService {

    private final CompanyProductRepository companyProductRepository;
    private final ModelMapper modelMapper;
    private final userRepository userRepository;

    public CompanyProductImpl(CompanyProductRepository companyProductRepository, userRepository userRepository, ModelMapper modelMapper) {
        this.companyProductRepository = companyProductRepository;
        this.modelMapper = modelMapper;
        this.userRepository= userRepository;
    }


    @Override
    public CompanyProductDto save(CompanyProductDto companyProductDto) {

        CompanyProduct companyProduct = modelMapper.map(companyProductDto, CompanyProduct.class);

        User user  = userRepository.findByUsername(companyProductDto.getUsername());

        companyProduct.setUser(user);
        companyProduct.setCompany(user.getCompany());
        companyProduct = companyProductRepository.save(companyProduct);

        return companyProductDto;
    }

    @Override
    public CompanyProductDto getById(Long id) {
        return null;
    }

    @Override
    public CompanyProductDto getByCompany(CompanyProductDto companyProduct) {
        return null;
    }

    @Override
    public TPage<CompanyProductDto> getAllPageable(Pageable pageable) {
        return null;
    }

    @Override
    public List<CompanyProductDto> getAllByCompanyName() {
        return null;
    }

    @Override
    public List<CompanyProductDto> getAll() {
        List<CompanyProduct> data = companyProductRepository.findAll();
        return Arrays.asList(modelMapper.map(data, CompanyProductDto[].class));
    }

    @Override
    public Boolean delete(CompanyProductDto companyProduct) {
        return null;
    }

    //burayı sil
    @Override
    public CompanyProductDto update(Long id, CompanyProductDto companyProduct) {
        return null;
    }

   /* @Override
    public CompanyProduct update(Long id, CompanyProductDto companyProduct) {

        CompanyProduct companyProductDb = companyProductRepository.getOne(id);

        companyProductDb.setProduct(companyProduct.getProduct());  //buraya bak
        companyProductDb.setProductPrice(companyProduct.getProductPrice());
        companyProductDb.setStockOnHand(companyProduct.getStockOnHand());
        companyProductDb.setProductAmount(companyProduct.getProductAmount());
        companyProductRepository.save(companyProductDb);

        return modelMapper.map(companyProductDb, CompanyProductDto.class);
    }*/


    //Delete Operation Here...
    public Boolean delete(Long companyProductID) {
        companyProductRepository.deleteById(companyProductID);
        return true;
    }
}
