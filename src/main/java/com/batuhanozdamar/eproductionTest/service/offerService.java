package com.batuhanozdamar.eproductionTest.service;

import com.batuhanozdamar.eproductionTest.dto.offerDto;
import com.batuhanozdamar.eproductionTest.dto.productDto;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface offerService {

    offerDto save(offerDto offer);

    offerDto getById(Long id);

    TPage<offerDto> getAllPageable(Pageable pageable);

    List<offerDto> getAllByUsername();

    Boolean delete(offerDto offer);

    offerDto update(Long id, offerDto offer);
}
