package com.himedia.nuovo_project.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class
ReservationFood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int reservationId; // Reservation 테이블의 외래 키

    private int menuId; // Menu 테이블의 외래 키

    private int quantity; // 주문 수량

    private int amountPrice; // Menu.menuPrice * ReservationFood.quantity


}
