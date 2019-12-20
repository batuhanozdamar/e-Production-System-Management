package com.batuhanozdamar.eproductionTest.repository;

import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.entity.product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface productRepository extends JpaRepository<product, Long> {

   /* product getByProductCategory(String productCategory);

    product getByProductCategoryAndIdNot(String productCategory, Long id);

    List<product> getByProductCategoryContains(String productName);*/

    Page<product> findAll(Pageable pageable);

    List<product> findAll(Sort sort);

    //List<product> findByCompany(User company);

}
