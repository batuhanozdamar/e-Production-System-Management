package com.batuhanozdamar.eproductionTest.service;

import com.batuhanozdamar.eproductionTest.dto.ProductDto;
import com.batuhanozdamar.eproductionTest.dto.ReportDto;
import com.batuhanozdamar.eproductionTest.entity.ReportForm;

public interface ReportFormService {

    ReportDto save(ReportDto reportForm);
}
