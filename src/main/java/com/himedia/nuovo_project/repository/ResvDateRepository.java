package com.himedia.nuovo_project.repository;

import com.himedia.nuovo_project.dto.ReservationDate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ResvDateRepository extends JpaRepository<ReservationDate, Integer> {



    List<ReservationDate> findByResvDate(LocalDate resvDate);

    List<ReservationDate> findByResvDateBefore(LocalDate today);

    List<ReservationDate> getReservationDateByResvDate(LocalDate resvDate);

    ReservationDate findByResvDateAndResvTypeAndResvTime(LocalDate resvDate, int resvType, int resvTime);

    ReservationDate getReservationDatesById(int reservationDateId);

    ReservationDate getReservationDateById(int id);
}
