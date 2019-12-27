package com.batuhanozdamar.eproductionTest.repository;

import com.batuhanozdamar.eproductionTest.entity.Company;
import com.batuhanozdamar.eproductionTest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface userRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    List<User> findByCompany(Company company);
}
