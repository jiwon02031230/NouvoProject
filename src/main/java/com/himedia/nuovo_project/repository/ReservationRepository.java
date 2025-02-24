package com.himedia.nuovo_project.repository;

import com.himedia.nuovo_project.dto.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    Reservation getReservationsByResvDateId(int resvDateId);

    List<Reservation> getReservationsByResvMemId(int resvMemId);

    Reservation getReservationsById(int id);
}
