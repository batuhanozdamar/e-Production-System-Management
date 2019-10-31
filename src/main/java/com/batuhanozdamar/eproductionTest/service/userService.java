package com.batuhanozdamar.eproductionTest.service;

import com.batuhanozdamar.eproductionTest.dto.userDto;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.springframework.data.domain.Pageable;

public interface userService {

    userDto save(userDto user);

    userDto getById(Long id);

    TPage<userDto> getAllPageable(Pageable pageable);

    userDto getByUsername(String username);

    Boolean delete(userDto user);

}
