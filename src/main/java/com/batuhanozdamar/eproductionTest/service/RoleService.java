package com.batuhanozdamar.eproductionTest.service;

import com.batuhanozdamar.eproductionTest.dto.RoleDto;
import com.batuhanozdamar.eproductionTest.entity.Role;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoleService {

    RoleDto save(RoleDto role);
    RoleDto getByRoleId(Long id);
    TPage<RoleDto> getAllPageable(Pageable pageable);
    List<RoleDto> getAllByCompanyName();
    Boolean delete(RoleDto role);
    RoleDto update(Long id, RoleDto role);

    List<RoleDto> findAllBySelectable(Boolean selectable);
}
