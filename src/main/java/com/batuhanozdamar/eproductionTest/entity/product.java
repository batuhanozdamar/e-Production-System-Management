package com.batuhanozdamar.eproductionTest.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class product{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "product_name", length = 50)
    private String productName;

    @Column(name = "product_code", length = 50, unique = true)
    private String productCode;

    @JoinColumn(name = "category")
    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    private Category category;

    @Column(name = "date", insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

}
