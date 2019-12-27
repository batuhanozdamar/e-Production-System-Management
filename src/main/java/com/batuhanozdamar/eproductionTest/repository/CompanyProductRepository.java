package com.batuhanozdamar.eproductionTest.repository;

import com.batuhanozdamar.eproductionTest.entity.Company;
import com.batuhanozdamar.eproductionTest.entity.CompanyProduct;
import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.entity.offer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CompanyProductRepository extends JpaRepository<CompanyProduct, Long> {

    List<CompanyProduct> findAll(Sort sort);
    List<CompanyProduct> findByCompany(Company company);
    Page<CompanyProduct> findAll(Pageable pageable);


    @Query("Select cp.productCode as productCode, cp.product.category.title as category, " +
            "cp.product.productName as productName, cp.productPrice as productPrice, " +
            "cp.company.companyName as companyName  " +
            "from CompanyProduct cp  " +
            "left join offer o on o.companyProduct.id = cp.id and o.company =:company " +
            "where cp.company <> :company")
    List<CompanyProduct> ozan(Company company);
}
