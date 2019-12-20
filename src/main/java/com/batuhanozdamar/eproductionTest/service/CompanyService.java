package com.batuhanozdamar.eproductionTest.service;

import com.batuhanozdamar.eproductionTest.dto.CategoryDto;
import com.batuhanozdamar.eproductionTest.dto.CompanyDto;
import com.batuhanozdamar.eproductionTest.dto.OfferDto;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CompanyService {

    CompanyDto save(CompanyDto company);
    CompanyDto getById(Long id);
    CompanyDto getByCompanyName(String name);
    TPage<CompanyDto> getAllPageable(Pageable pageable);
    List<CompanyDto> getAll();
    Boolean delete(CompanyDto company);
}
