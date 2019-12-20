package com.batuhanozdamar.eproductionTest.repository;

import com.batuhanozdamar.eproductionTest.entity.OfferStatus;
import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.entity.offer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OfferStatusRepository extends JpaRepository<OfferStatus, Long> {

    List<OfferStatus> findAll(Sort sort);
    Page<OfferStatus> findAll(Pageable pageable);
    List<OfferStatus> findAllById(Long id);
}
