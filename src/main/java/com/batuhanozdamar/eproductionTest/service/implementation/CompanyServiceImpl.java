package com.batuhanozdamar.eproductionTest.service.implementation;

import com.batuhanozdamar.eproductionTest.dto.CompanyDto;
import com.batuhanozdamar.eproductionTest.dto.ProductDto;
import com.batuhanozdamar.eproductionTest.entity.Category;
import com.batuhanozdamar.eproductionTest.entity.Company;
import com.batuhanozdamar.eproductionTest.entity.product;
import com.batuhanozdamar.eproductionTest.repository.CategoryRepository;
import com.batuhanozdamar.eproductionTest.repository.CompanyRepository;
import com.batuhanozdamar.eproductionTest.repository.userRepository;
import com.batuhanozdamar.eproductionTest.service.CompanyService;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
@Service
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;
    private final ModelMapper modelMapper;
    private final userRepository userRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository, userRepository userRepository, ModelMapper modelMapper) {
        this.companyRepository = companyRepository;
        this.modelMapper = modelMapper;
        this.userRepository= userRepository;
    }

    @Override
    public CompanyDto save(CompanyDto company) {
        Company c = modelMapper.map(company, Company.class);
        /*User user = userRepository.getOne(category.getId());
        c.setId(user);*/

        c = companyRepository.save(c);
        company.setId(c.getId());

        return company;
    }

    @Override
    public CompanyDto getById(Long id) {
        return null;
    }

    @Override
    public CompanyDto getByCompanyName(String name) {
        return null;
    }

    @Override
    public TPage<CompanyDto> getAllPageable(Pageable pageable) {
        return null;
    }

    @Override
    public List<CompanyDto> getAll() {
        List<Company> data = companyRepository.findAll();
        return Arrays.asList(modelMapper.map(data, CompanyDto[].class));
    }

    @Override
    public Boolean delete(CompanyDto company) {
        return null;
    }

    //Delete Operation Here...
    public Boolean delete(Long companyID) {
        companyRepository.deleteById(companyID);
        return true;
    }
}
