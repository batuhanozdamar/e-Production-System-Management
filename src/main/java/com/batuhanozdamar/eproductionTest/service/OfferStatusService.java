package com.batuhanozdamar.eproductionTest.service;

import com.batuhanozdamar.eproductionTest.dto.CompanyProductDto;
import com.batuhanozdamar.eproductionTest.dto.OfferStatusDto;
import com.batuhanozdamar.eproductionTest.dto.ProductDto;
import com.batuhanozdamar.eproductionTest.entity.OfferStatus;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OfferStatusService {

    OfferStatusDto save(OfferStatusDto offerStatus);
    OfferStatusDto getByStatusId(Long id);
    TPage<OfferStatusDto> getAllPageable(Pageable pageable);
    List<OfferStatusDto> getAll();
    Boolean delete(OfferStatusDto offerStatus);
    OfferStatusDto update(Long id, OfferStatusDto offerStatus);
}
