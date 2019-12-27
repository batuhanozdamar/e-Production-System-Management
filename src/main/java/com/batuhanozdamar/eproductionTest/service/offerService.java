package com.batuhanozdamar.eproductionTest.service;

import com.batuhanozdamar.eproductionTest.dto.OfferDto;
import com.batuhanozdamar.eproductionTest.entity.Company;
import com.batuhanozdamar.eproductionTest.entity.CompanyProduct;
import com.batuhanozdamar.eproductionTest.entity.offer;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface offerService {

    offer getById(Company company, CompanyProduct companyProduct);

    OfferDto save(OfferDto offer);

    OfferDto getById(Long id);

    TPage<OfferDto> getAllPageable(Pageable pageable);

    List<OfferDto> getAllByUsername();

    Boolean delete(OfferDto offer);

    OfferDto update(Long id, OfferDto offer);

    List<OfferDto> getByCompanyId(Long id, String itemType);
    List<OfferDto> getOffers(Long statusId, Long productCompanyId, Long offerCompanyId);

    // reject offer and change status
    OfferDto saveD(OfferDto offer);

    void rejectOffer(Long id);

    void accepOffer(Long id);
}
