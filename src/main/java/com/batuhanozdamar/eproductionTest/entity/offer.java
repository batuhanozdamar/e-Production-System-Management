package com.batuhanozdamar.eproductionTest.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "offer")
@ToString
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class offer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productId;

    @Column(name = "product_name", length = 100)
    private String productName;

    @Column(name = "product_code", length = 10)
    private String productCode;

    @Column(name = "product_category", length = 100)
    private String productCategory;

    @Column(name = "product_price", length = 4)
    private double productPrice;

    @JoinColumn(name = "company_user_id")
    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    private User company;

    @Column(name = "askedPrice", length = 8)
    private double askedPrice;

   /* @Column(name = "acceptedPrice", length = 8)
    private double acceptedPrice;*/
}

