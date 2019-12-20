package com.batuhanozdamar.eproductionTest.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "users", indexes = {@Index(name = "idx_username", columnList = "uname")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "uname", length = 20, unique = true)
    private String username;

    @Column(name = "pwd", length = 100)
    private String password;

    @Column(name = "name_surname", length = 50)
    private String nameSurname;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "is_admin", insertable = false, updatable = false)
    private Boolean isAdmin;

    @NotNull
    @JoinColumn(name="role_id")
    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    private Role role;

    @JoinColumn(name="company_id")
    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    private Company company;
}
