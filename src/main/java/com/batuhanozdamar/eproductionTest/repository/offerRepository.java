package com.batuhanozdamar.eproductionTest.repository;

import com.batuhanozdamar.eproductionTest.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface offerRepository extends JpaRepository<offer, Long> {

    List<offer> findAll(Sort sort);
    //List<offer> findByCompany(User company);
    Page<offer> findAll(Pageable pageable);

    @Query("select o from offer o where o.company =:company and o.companyProduct =:companyProduct")
    Optional<offer> getOneByCompanyProduct(Company company, CompanyProduct companyProduct);
}
