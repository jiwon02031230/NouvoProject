package com.himedia.nuovo_project.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class ReservationDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDate resvDate; // 예약 날짜

    private int resvType; // 예약 시간 구분 (0: 점심, 1: 저녁)

    private int resvTime; // 예약 시간

    private int resvStatus = 0; // 예약 현황 (0: 미예약, 1: 예약 완료, 2: 예약 불가)

}
