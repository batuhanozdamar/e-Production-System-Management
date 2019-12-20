package com.batuhanozdamar.eproductionTest.service.implementation;

import com.batuhanozdamar.eproductionTest.dto.CategoryDto;
import com.batuhanozdamar.eproductionTest.dto.RoleDto;
import com.batuhanozdamar.eproductionTest.entity.Category;
import com.batuhanozdamar.eproductionTest.entity.Role;
import com.batuhanozdamar.eproductionTest.repository.RoleRepository;
import com.batuhanozdamar.eproductionTest.repository.userRepository;
import com.batuhanozdamar.eproductionTest.service.RoleService;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;
    private final userRepository userRepository;

    public RoleServiceImpl(RoleRepository roleRepository, userRepository userRepository, ModelMapper modelMapper) {
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
        this.userRepository= userRepository;
    }

    @Override
    public RoleDto save(RoleDto role) {
        Role c = modelMapper.map(role, Role.class);
        c = roleRepository.save(c);

        role.setId(c.getId());
        return role;
    }

    @Override
    public RoleDto getByRoleId(Long id) {
        RoleDto roleDto = modelMapper.map(roleRepository.getOne(id), RoleDto.class);
        return roleDto;
    }

    @Override
    public TPage<RoleDto> getAllPageable(Pageable pageable) {
        return null;
    }

    @Override
    public List<RoleDto> getAllByCompanyName() {
        return null;
    }

    @Override
    public Boolean delete(RoleDto role) {
        return null;
    }

    @Override
    public RoleDto update(Long id, RoleDto role) {
        Role roleDb = roleRepository.getOne(id);

        roleDb.setName(role.getName());  //buraya bak
        roleRepository.save(roleDb);

        return modelMapper.map(roleDb, RoleDto.class);
    }

    @Override
    public List<RoleDto> findAllBySelectable(Boolean selectable) {
        List<Role> data = roleRepository.findAllBySelectable(selectable);
        return Arrays.asList(modelMapper.map(data, RoleDto[].class));
    }

    //Delete Operation Here...
    public Boolean delete(Long roleID) {
        roleRepository.deleteById(roleID);
        return true;
    }
}
