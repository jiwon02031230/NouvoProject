package com.himedia.nuovo_project.repository;

import com.himedia.nuovo_project.dto.ReservationFood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResvFoodRepository extends JpaRepository<ReservationFood, Integer> {
    List<ReservationFood> getAllByReservationId(int reservationId);
}
