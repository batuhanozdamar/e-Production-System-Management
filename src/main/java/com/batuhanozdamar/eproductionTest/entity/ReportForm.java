package com.batuhanozdamar.eproductionTest.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ReportForm")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportForm {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name_Surname", length = 50)
    private String nameSurname;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "subject",length = 50)
    private String subject;

    @Column(name = "message",length = 500)
    private String message;

    @Column(name = "sentDate", insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date sentDate;
}
