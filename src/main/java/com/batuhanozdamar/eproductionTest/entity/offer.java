package com.batuhanozdamar.eproductionTest.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

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
    private Long id;

    @JoinColumn(name = "company_product_id")
    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    private CompanyProduct companyProduct;

    @JoinColumn(name = "user_id")
    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    private User user;

    @Column(name = "askedPrice", length = 8)
    private double askedPrice;

    //offer id set 1
    @JoinColumn(name = "offer_status_id")
    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    private OfferStatus offerStatus;

    @Column(name = "responsePrice", length = 8)
    private double responsePrice;

    @Column(name = "date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date soldAt;

   /* @Column(name = "acceptedPrice", length = 8)
    private double acceptedPrice;*/
}

