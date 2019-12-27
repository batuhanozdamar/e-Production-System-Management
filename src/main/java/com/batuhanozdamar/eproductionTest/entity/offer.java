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
    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    private CompanyProduct companyProduct;

    @JoinColumn(name = "company_id")
    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    private Company company;

    @Column(name = "askedPrice", length = 8)
    private double askedPrice;

    @Column(name = "askedAmount", length = 8)
    private double askedAmount;

    //offer id set 1
    @JoinColumn(name = "offer_status_id")
    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    private OfferStatus offerStatus;

    @Column(name = "offered_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date offeredAt;

    @Column(name = "sold_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date soldAt;

    @Column(name = "rejected_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date rejectedAt;

}

