package com.batuhanozdamar.eproductionTest.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "OfferStatus")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class OfferStatus {

    //offer id set 1 olacak (1-4 arası olacak)
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", length = 50)
    private String name;
}
