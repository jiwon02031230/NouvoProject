package com.himedia.nuovo_project.controller;

import com.himedia.nuovo_project.dto.Menu;
import com.himedia.nuovo_project.dto.Reservation;
import com.himedia.nuovo_project.dto.ReservationDate;
import com.himedia.nuovo_project.repository.MenuRepository;
import com.himedia.nuovo_project.repository.ReservationRepository;
import com.himedia.nuovo_project.repository.ResvDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class ResvRestController {

    @Autowired
    ResvDateRepository resvDateRepository;

    @Autowired
    MenuRepository menuRepository;
    @Autowired
    private ReservationRepository reservationRepository;

    @GetMapping("/reservation/getresv")
    public List reservation(@RequestParam int year, @RequestParam int month, @RequestParam int daysInMonth) {

        List listDay = new ArrayList();

        for (int i = 1; i <= daysInMonth; i++) {
            LocalDate date = LocalDate.of(year, month, i);
            listDay.add(resvDateRepository.findByResvDate(date));
        }

        return listDay;
    }

    @GetMapping("/resvTime")
    public List reservation(@RequestParam LocalDate dates){
        System.out.println("restcontroller실행!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        System.out.println(dates);
        List<ReservationDate> clickdateList = resvDateRepository.findByResvDate(dates);

        return clickdateList;
    }

    @GetMapping("/selectedMenu")
    public Menu selectedMenu(@RequestParam String name) {
        System.out.println(name);

        Menu selectedMenu = menuRepository.getMenusByMenuName(name);

        return selectedMenu;
    }

    @PostMapping("/reservation/cancel")
    public String cancelReservation(@RequestParam String resvId) {
        int reservationId = Integer.parseInt(resvId);

        Reservation resv = reservationRepository.getReservationsById(reservationId);
        resv.setResvStatus((byte)1);
        ReservationDate date = resvDateRepository.getReservationDateById(resv.getResvDateId());
        date.setResvStatus((byte)0);

        reservationRepository.save(resv);

        return "성공";
    }


}
