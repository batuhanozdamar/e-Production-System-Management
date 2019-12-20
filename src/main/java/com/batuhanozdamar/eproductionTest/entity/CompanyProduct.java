package com.batuhanozdamar.eproductionTest.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "CompanyProduct")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JoinColumn(name = "company_id")
    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    private Company company;

    @JoinColumn(name = "product_id")
    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    private product product;

    @Column(name = "product_price", length = 4)
    private double productPrice;

    @Column(name = "product_amount", length = 4)
    private double productAmount;

    @Column(name = "product_color", length = 10)
    private double productColor;

    @Column(name = "stockOnHand", length = 4)
    private double stockOnHand;

    @JoinColumn(name = "user_id")
    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    private User user;
}
