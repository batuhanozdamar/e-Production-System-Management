package com.batuhanozdamar.eproductionTest.service.implementation;

import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.dto.registrationRequest;
import com.batuhanozdamar.eproductionTest.dto.userDto;
import com.batuhanozdamar.eproductionTest.repository.userRepository;
import com.batuhanozdamar.eproductionTest.service.userService;
import com.batuhanozdamar.eproductionTest.util.TPage;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements userService {

    private final com.batuhanozdamar.eproductionTest.repository.userRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(userRepository userRepository, ModelMapper modelMapper, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public userDto save(userDto user) {
        User u = modelMapper.map(user, User.class);
        u = userRepository.save(u);
        user.setId(u.getId());
        return user;
    }

    @Override
    public userDto getById(Long id) {
        User u = userRepository.getOne(id);
        return modelMapper.map(u, userDto.class);
    }

    @Override
    public TPage<userDto> getAllPageable(Pageable pageable) {
        Page<User> data = userRepository.findAll(pageable);
        TPage<userDto> respnose = new TPage<userDto>();
        respnose.setStat(data, Arrays.asList(modelMapper.map(data.getContent(), userDto[].class)));
        return respnose;
    }

    public List<userDto> getAll() {
        List<User> data = userRepository.findAll();
        return Arrays.asList(modelMapper.map(data, userDto[].class));
    }


    @Override
    public userDto getByUsername(String username) {
        User u = userRepository.findByUsername(username);
        return modelMapper.map(u, userDto.class);
    }

    @Override
    public Boolean delete(userDto user) { return null; }

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
            userRepository.save(user);
            return Boolean.TRUE;

        } catch (Exception e) {
            log.error("REGISTRATION=>", e);
            return Boolean.FALSE;
        }
    }
}
