package com.batuhanozdamar.eproductionTest.repository;

import com.batuhanozdamar.eproductionTest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
}
