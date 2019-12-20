package com.batuhanozdamar.eproductionTest.service.implementation;

import com.batuhanozdamar.eproductionTest.dto.OfferDto;
import com.batuhanozdamar.eproductionTest.entity.OfferStatus;
import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.entity.offer;
import com.batuhanozdamar.eproductionTest.repository.offerRepository;
import com.batuhanozdamar.eproductionTest.repository.userRepository;
import com.batuhanozdamar.eproductionTest.service.offerService;
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
public class offerServiceImpl implements offerService {

    private final offerRepository offerRepository;
    private final ModelMapper modelMapper;
    private final userRepository userRepository;

    public offerServiceImpl(offerRepository offerRepository, userRepository userRepository, ModelMapper modelMapper) {
        this.offerRepository = offerRepository;
        this.modelMapper = modelMapper;
        this.userRepository= userRepository;
    }

    @Override
    public OfferDto save(OfferDto offer) {
        //    product productCheck = productRepository.getByProductCategory(product.getProductCategory());

        //if (productCheck != null)
        //  throw new IllegalArgumentException("Product Category Already Exist");

        OfferStatus o = modelMapper.map(offer, OfferStatus.class);
        OfferStatus offerStatus = new OfferStatus();
        offerStatus.setId(1l);

        /*o.setOfferStatus(offerStatus);
        User user = userRepository.findByUsername(offer.getUsername());
        o.setUser(user);

        o = offerRepository.save(o);
        offer.setId(o.getId());*/

        return offer;
    }

    @Override
    public OfferDto getById(Long id) {
        offer p = offerRepository.getOne(id);
        return modelMapper.map(p, OfferDto.class);
    }


    @Override
    public TPage<OfferDto> getAllPageable(Pageable pageable) {

        Page<offer> data = offerRepository.findAll(pageable);
        TPage<OfferDto> respnose = new TPage<OfferDto>();
        respnose.setStat(data, Arrays.asList(modelMapper.map(data.getContent(), OfferDto[].class)));
        return respnose;
    }


    @Override
    public Boolean delete(OfferDto offer) { return null; }

    public Boolean delete(Long id) {
        offerRepository.deleteById(id);
        return true;
    }

    @Override
    public OfferDto update(Long id, OfferDto offerdto) {
        offer offerDb = offerRepository.getOne(id);
        if (offerDb == null)
            throw new IllegalArgumentException("Offer Does Not Exist ID:" + id);

     /*   //product productCheck = productRepository.getByProductCategoryAndIdNot(product.getProductCategory(), id);
        //if (productCheck != null)
        //  throw new IllegalArgumentException("Product Category Already Exist");

        offerDb.setProductCode(offer.getProductCode);
        offerDb.setProductName(offer.getProductName());
        offerDb.setProductCategory(offer.getProductCategory());
        offerDb.setProductPrice(offer.getProductPrice());
        offerDb.setAskedPrice(offer.getAskedPrice());
        //offerDb.setUserId(offer.getUsername());*/

        offerRepository.save(offerDb);
        return modelMapper.map(offerDb, OfferDto.class);
    }

    public List<OfferDto> getAll() {
        List<offer> data = offerRepository.findAll();
        return Arrays.asList(modelMapper.map(data, OfferDto[].class));
    }

    public List<OfferDto> getAllByUsername() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName);

        //List<offer> data = offerRepository.findByCompany(user);

        return null;// Arrays.asList(modelMapper.map(data, OfferDto[].class));
    }

}
