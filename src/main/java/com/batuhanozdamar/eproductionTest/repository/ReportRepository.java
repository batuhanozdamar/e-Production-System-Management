package com.batuhanozdamar.eproductionTest.repository;

import com.batuhanozdamar.eproductionTest.dto.CategoryDto;
import com.batuhanozdamar.eproductionTest.dto.ReportDto;
import com.batuhanozdamar.eproductionTest.entity.ReportForm;
import com.batuhanozdamar.eproductionTest.entity.product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<ReportForm, Long> {

    ReportDto save(ReportDto reportDto);
}
