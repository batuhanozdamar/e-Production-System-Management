package com.batuhanozdamar.eproductionTest.service.implementation;

import com.batuhanozdamar.eproductionTest.dto.CompanyDto;
import com.batuhanozdamar.eproductionTest.dto.RoleDto;
import com.batuhanozdamar.eproductionTest.entity.Company;
import com.batuhanozdamar.eproductionTest.entity.Role;
import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.dto.registrationRequest;
import com.batuhanozdamar.eproductionTest.dto.UserDto;
import com.batuhanozdamar.eproductionTest.repository.RoleRepository;
import com.batuhanozdamar.eproductionTest.repository.userRepository;
import com.batuhanozdamar.eproductionTest.service.CompanyService;
import com.batuhanozdamar.eproductionTest.service.RoleService;
import com.batuhanozdamar.eproductionTest.service.userService;
import com.batuhanozdamar.eproductionTest.util.TPage;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements userService {

    private final com.batuhanozdamar.eproductionTest.repository.userRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final CompanyService companyService;
    private final RoleService roleService;
    private final RoleRepository roleRepository;

    public UserServiceImpl(userRepository userRepository, ModelMapper modelMapper, BCryptPasswordEncoder bCryptPasswordEncoder, CompanyService companyService, RoleServiceImpl roleService, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.companyService = companyService;
        this.roleService = roleService;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserDto save(UserDto user) {
        User u = modelMapper.map(user, User.class);
        u = userRepository.save(u);
        CompanyDto company = companyService.save(user.getCompany());
        user.setId(u.getId());
        user.setCompany(company);
        return user;
    }

    @Override
    public UserDto getById(Long id) {
        User u = userRepository.getOne(id);
        return modelMapper.map(u, UserDto.class);
    }

    @Override
    public TPage<UserDto> getAllPageable(Pageable pageable) {
        Page<User> data = userRepository.findAll(pageable);
        TPage<UserDto> respnose = new TPage<UserDto>();
        respnose.setStat(data, Arrays.asList(modelMapper.map(data.getContent(), UserDto[].class)));
        return respnose;
    }

    public List<UserDto> getAll() {
        List<User> data = userRepository.findAll();
        return Arrays.asList(modelMapper.map(data, UserDto[].class));
    }


    @Override
    public UserDto getByUsername(String username) {
        User u = userRepository.findByUsername(username);
        return modelMapper.map(u, UserDto.class);
    }

    @Override
    public Boolean delete(UserDto user) { return null; }

    @Override
    public void createWithCompany(UserDto user) {
        register2(user);
    }

    @Override
    public List<UserDto> getByCompany(Long id) {
        Company company = companyService.getById(id);

        List<User> userList = userRepository.findByCompany(company);
        List<UserDto> resp = new ArrayList<>();
        userList.forEach(user -> {
            UserDto userDto = modelMapper.map(user, UserDto.class);
            resp.add(userDto);
        });

        return resp;
    }

    public Boolean delete(Long id) {
        userRepository.deleteById(id);
        return true;
    }

    @Transactional
    public Boolean register(registrationRequest registrationRequest) {

        try {
            User user = new User();
            user.setEmail(registrationRequest.getEmail());
            user.setNameSurname(registrationRequest.getNameSurname());
            user.setPassword(bCryptPasswordEncoder.encode(registrationRequest.getPassword()));
            user.setUsername(registrationRequest.getUsername());
            CompanyDto companyDto = new CompanyDto(null, registrationRequest.getCompany());
            companyDto = companyService.save(companyDto);
            Company company = modelMapper.map(companyDto, Company.class);
            user.setCompany(company);
            RoleDto role = roleService.getByRoleId(Long.valueOf(1));
            user.setRole(modelMapper.map(role, Role.class));
            userRepository.save(user);
            return Boolean.TRUE;

        } catch (Exception e) {
            log.error("REGISTRATION=>", e);
            return Boolean.FALSE;
        }
    }

    @Transactional
    public Boolean register2(UserDto userDto) {

        try {
            User user = new User();
            user.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
            user.setUsername(userDto.getUsername());
            user.setNameSurname(userDto.getNameSurname());

            Optional<Role> userOptional =roleRepository.findById(userDto.getRole().getId());
            userOptional.ifPresent(role -> {
                user.setRole(role);
            });

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentPrincipalName = authentication.getName();
            User user1 = userRepository.findByUsername(currentPrincipalName);
            user.setCompany(user1.getCompany());
            userRepository.save(user);
            return Boolean.TRUE;

        } catch (Exception e) {
            log.error("REGISTRATION=>", e);
            return Boolean.FALSE;
        }
    }
}
