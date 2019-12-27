package com.batuhanozdamar.eproductionTest.service;

import com.batuhanozdamar.eproductionTest.dto.CompanyProductDto;
import com.batuhanozdamar.eproductionTest.dto.procurementDto;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CompanyProductService {

    CompanyProductDto save(CompanyProductDto companyProduct);
    CompanyProductDto getById(Long id);
    CompanyProductDto getByCompany(CompanyProductDto companyProduct); //buraya bak

    TPage<CompanyProductDto> getAllPageable(Pageable pageable);
    List<CompanyProductDto> getAllByCompanyName();
    List<CompanyProductDto> getAll(Long id);
    Boolean delete(CompanyProductDto companyProduct);
    CompanyProductDto update(Long id, CompanyProductDto companyProduct);

    List<procurementDto> getAllProducts(Long id);

    List<procurementDto> getAllProductsByCategory(Long id, Long categoryId);
}
