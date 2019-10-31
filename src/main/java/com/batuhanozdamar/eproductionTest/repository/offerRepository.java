package com.batuhanozdamar.eproductionTest.repository;

import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.entity.offer;
import com.batuhanozdamar.eproductionTest.entity.product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface offerRepository extends JpaRepository<offer, Long> {

    List<offer> findAll(Sort sort);
    List<offer> findByCompany(User company);
    Page<offer> findAll(Pageable pageable);
}
