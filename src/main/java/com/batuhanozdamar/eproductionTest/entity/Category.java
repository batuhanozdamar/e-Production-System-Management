package com.batuhanozdamar.eproductionTest.entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Category {

    @Id
    @Column(name = "value")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long value;

    @Column(name = "title", length = 50)
    private String title;
}
