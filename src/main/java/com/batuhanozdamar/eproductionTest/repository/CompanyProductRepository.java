package com.batuhanozdamar.eproductionTest.repository;

import com.batuhanozdamar.eproductionTest.entity.CompanyProduct;
import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.entity.offer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyProductRepository extends JpaRepository<CompanyProduct, Long> {

    List<CompanyProduct> findAll(Sort sort);
    List<CompanyProduct> findByCompany(User company);
    Page<CompanyProduct> findAll(Pageable pageable);


}
