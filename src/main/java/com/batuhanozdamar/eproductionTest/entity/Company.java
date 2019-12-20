package com.batuhanozdamar.eproductionTest.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "company")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Company implements Serializable {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;

@Column(name = "companyName", length = 50)
private String companyName;

}
