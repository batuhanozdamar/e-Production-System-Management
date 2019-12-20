package com.batuhanozdamar.eproductionTest.service;

import com.batuhanozdamar.eproductionTest.dto.OfferDto;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface offerService {

    OfferDto save(OfferDto offer);

    OfferDto getById(Long id);

    TPage<OfferDto> getAllPageable(Pageable pageable);

    List<OfferDto> getAllByUsername();

    Boolean delete(OfferDto offer);

    OfferDto update(Long id, OfferDto offer);
}
