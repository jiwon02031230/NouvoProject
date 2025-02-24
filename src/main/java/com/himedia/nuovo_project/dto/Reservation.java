package com.himedia.nuovo_project.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    private int resvMemId;

    private String resvName;

    private String resvPhoneNum;

    @Column(columnDefinition = "DEFAULT NULL")
    private String resvEmail;

    private int totalGuests;

    @Column(columnDefinition = "DEFAULT 0")
    private int resvDateId;

    private int totalPayment;

    @Column(columnDefinition = "DEFAULT NULL")
    private String resvNote;

    private byte resvPayType; // 0: 현장결제, 1: 인터넷결제

    @Column(columnDefinition = "DEFAULT 2")
    private byte resvStatus; // 0: 방문완료, 1: 취소, 2: 결제완료(미방문)

    private LocalDate payDate;

}
