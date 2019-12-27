package com.batuhanozdamar.eproductionTest.service.implementation;

import com.batuhanozdamar.eproductionTest.dto.OfferStatusDto;
import com.batuhanozdamar.eproductionTest.entity.OfferStatus;
import com.batuhanozdamar.eproductionTest.repository.OfferStatusRepository;
import com.batuhanozdamar.eproductionTest.repository.userRepository;
import com.batuhanozdamar.eproductionTest.service.OfferStatusService;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OfferStatusServiceImpl implements OfferStatusService {

    private final OfferStatusRepository offerStatusRepository;
    private final ModelMapper modelMapper;
    private final userRepository userRepository;

    public OfferStatusServiceImpl(OfferStatusRepository offerStatusRepository, userRepository userRepository, ModelMapper modelMapper) {
        this.offerStatusRepository = offerStatusRepository;
        this.modelMapper = modelMapper;
        this.userRepository= userRepository;
    }

    @Override
    public OfferStatusDto save(OfferStatusDto offerStatus) {
        OfferStatus o = modelMapper.map(offerStatus, OfferStatus.class);
        /*User user = userRepository.getOne(category.getId());
        c.setId(user);*/

        o = offerStatusRepository.save(o);
        offerStatus.setId(o.getId());
        return offerStatus;
    }

    @Override
    public OfferStatus getByStatusId(Long id) {
        return offerStatusRepository.findById(id).orElse(null);
    }

    @Override
    public TPage<OfferStatusDto> getAllPageable(Pageable pageable) {
        return null;
    }

    @Override
    public List<OfferStatusDto> getAll() {
        return null;
    }

    @Override
    public Boolean delete(OfferStatusDto offerStatus) {
        return null;
    }

    @Override
    public OfferStatusDto update(Long id, OfferStatusDto offerStatus) {
        OfferStatus offerStatusDb = offerStatusRepository.getOne(id);
        offerStatusDb.setId(offerStatusDb.getId());//bunları kontrol et debuggg
        offerStatusDb.setName(offerStatusDb.getName());

        offerStatusRepository.save(offerStatusDb);
        return modelMapper.map(offerStatusDb, OfferStatusDto.class);
    }

}
