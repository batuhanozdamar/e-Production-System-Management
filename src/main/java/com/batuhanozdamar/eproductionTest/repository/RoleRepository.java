package com.batuhanozdamar.eproductionTest.repository;

import com.batuhanozdamar.eproductionTest.entity.Category;
import com.batuhanozdamar.eproductionTest.entity.Role;
import com.batuhanozdamar.eproductionTest.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Long> {

    List<Role> findAll(Sort sort);
    //List<Role> findByCompany(User company);
    Page<Role> findAll(Pageable pageable);

    //ID'ye göre sorgu
    List<Role> findAllById(Long id);

    List<Role> findAllBySelectable(Boolean selectable);
}
