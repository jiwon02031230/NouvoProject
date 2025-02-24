package com.himedia.nuovo_project.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.himedia.nuovo_project.dto.*;
import com.himedia.nuovo_project.repository.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class ReservationController {

    @Autowired
    ResvDateRepository resvDateRepository;

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    MenuCategoryRepository menuCategoryRepository;

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    ResvFoodRepository resvFoodRepository;

    // 세션 활용하기

    @ModelAttribute("loginMember")
    public Member getLoginMember(HttpSession session) {
        return (Member) session.getAttribute("loginMember");
    }

    //03. 예약
    @GetMapping("/reservation")
    public String reservation(Model model, @ModelAttribute("loginMember") Member loginMember) {
        if (loginMember == null) {
            return "redirect:/login"; // 로그인 안 한 경우 로그인 페이지로 리다이렉트
        }

        LocalDate startDate = LocalDate.of(2025, 2, 1); // 🔥 2025년 2월 1일 고정
        LocalDate today = LocalDate.now(); // 현재 날짜 (예: 2025-02-17)
        LocalDate twoMonthsLater = today.plusMonths(2); // 현재 날짜 기준 +2개월 후

        // 🔹 2025년 2월 1일부터 twoMonthsLater까지 날짜 리스트 생성
        List<LocalDate> dateList = startDate.datesUntil(twoMonthsLater.plusDays(1)) // +1을 해서 마지막 날짜 포함
                .collect(Collectors.toList());

// 🔹 DB에 없는 날짜만 추가
        for (LocalDate date : dateList) {
            List<ReservationDate> checkDate = resvDateRepository.findByResvDate(date);

            if (checkDate.isEmpty()) {
                boolean isClosedDay = (date.getDayOfWeek() == DayOfWeek.TUESDAY || date.getDayOfWeek() == DayOfWeek.WEDNESDAY);
                int defaultStatus = isClosedDay ? 2 : 0; // 화/수요일이면 2(예약 불가), 아니면 0(미예약)

                for (int i = 0; i < 4; i++) {
                    ReservationDate reservationDate = new ReservationDate();
                    reservationDate.setResvDate(date);
                    reservationDate.setResvType(0); // 0: 점심
                    reservationDate.setResvTime(i + 11);
                    reservationDate.setResvStatus(defaultStatus);
                    resvDateRepository.save(reservationDate);
                }
                for (int i = 0; i < 4; i++) {
                    ReservationDate reservationDate = new ReservationDate();
                    reservationDate.setResvDate(date);
                    reservationDate.setResvType(1); // 1: 저녁
                    reservationDate.setResvTime(i + 17);
                    reservationDate.setResvStatus(defaultStatus);
                    resvDateRepository.save(reservationDate);
                }
            }
        } // end of for


        // 🔹 지난 날짜 데이터(resvDate < today)의 resvStatus를 2로 변경
        List<ReservationDate> pastReservations = resvDateRepository.findByResvDateBefore(today);
        for (ReservationDate pastResv : pastReservations) {
            pastResv.setResvStatus(2); // 2: 예약 불가 상태
        }


        // 변경된 데이터를 한 번에 저장 (Batch 처리)
        if (!pastReservations.isEmpty()) {
            resvDateRepository.saveAll(pastReservations);
        }

        // 메뉴 가져오기
        List<Menu> menuList = menuRepository.findAll();

        // 카테고리 가져오기
        List<MenuCategory> categories = menuCategoryRepository.findAllByOrderByIdAsc();
        model.addAttribute("categories", categories);

        // 카테고리별로 메뉴를 그룹핑
        Map<Integer, List<Menu>> categorizedMenus = menuList.stream()
                .collect(Collectors.groupingBy(Menu::getMenuCategory));
        model.addAttribute("categorizedMenus", categorizedMenus);
        model.addAttribute("loginMember", loginMember);

        return "reservation/reservation";
    }


    // 예약 - 결제페이지
    @PostMapping("/reservation/payment")
    public String submitReservation(
            @RequestParam("reservationFoodList") String reservationFoodJson,
            @ModelAttribute Reservation newReservation,
            @ModelAttribute ReservationDate resvDate,
            @ModelAttribute("loginMember") Member loginMember,
            Model model) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<ReservationFood> reservationFoodList = objectMapper.readValue(reservationFoodJson, new TypeReference<List<ReservationFood>>() {});

            System.out.println("✅ 받은 날짜 정보:");
            System.out.println("예약 날짜 : " + resvDate.getResvDate());
            System.out.println("예약 타입 : " + resvDate.getResvType());
            System.out.println("예약 시간 : " + resvDate.getResvTime());
            ReservationDate reservationDate = resvDateRepository.findByResvDateAndResvTypeAndResvTime(resvDate.getResvDate(),resvDate.getResvType(),resvDate.getResvTime());
            reservationDate.setResvStatus(1);

            int reservationDateId = reservationDate.getId();

            System.out.println("✅ 받은 예약 정보:");
            if (newReservation.getResvEmail()==""){
                newReservation.setResvEmail(null);
            }
            newReservation.setResvDateId(reservationDateId);
            newReservation.setResvStatus((byte) 1);
            newReservation.setResvMemId(loginMember.getId());
            newReservation.setPayDate(LocalDate.now());
            reservationRepository.save(newReservation);

            Reservation savedResv = reservationRepository.getReservationsByResvDateId(reservationDateId);
            int reservationId = savedResv.getId();

            if (reservationFoodList!=null && reservationFoodList.size()>0) {
                List<Menu> selectedMenu = new ArrayList<>(); // 리스트 초기화

                for (int i = 0; i < reservationFoodList.size(); i++) {

                    // 메뉴 ID 가져오기
                    int menuId = reservationFoodList.get(i).getMenuId();

                    // 예약 ID 설정 후 저장
                    reservationFoodList.get(i).setReservationId(reservationId);
                    resvFoodRepository.save(reservationFoodList.get(i));

                    // Optional 처리 후 메뉴 리스트에 추가
                    Menu menu = menuRepository.findById(menuId).orElse(null);
                    if (menu != null) {
                        selectedMenu.add(menu);
                    }
                }

                List<ReservationFood> resvFoodList = resvFoodRepository.getAllByReservationId(reservationId);
                System.out.println("resvFoodList=====================" + resvFoodList);
                System.out.println("selectedMenu=====================" + selectedMenu);

                model.addAttribute("resvFoodList", resvFoodList);
                model.addAttribute("selectedMenu", selectedMenu);
            }

            model.addAttribute("reservationDate", reservationDate);
            model.addAttribute("savedResv", savedResv);


            return "reservation/payment";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            model.addAttribute("reservationFailed", true);  // 예약 실패 플래그 추가
            System.out.println("예약실패!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            return "reservation/reservation";
        }
    }


    @PostMapping("/payment/complete")
    @ResponseBody
    public ResponseEntity<?> completePayment(@RequestBody Map<String, Object> requestData) {
        try {
            String impUid = (String) requestData.get("imp_uid");
            String dateId = (String) requestData.get("merchant_uid");

            System.out.println("✅ 받은 imp_uid: " + impUid);
            System.out.println("✅ 받은 reservationDateId: " + dateId);
            String PORTONE_API_SECRET = "JIIUH53xtlN2Rf6rpMcRaAactGOqw2jmEmS1ro4cJ6n7KIU2uLWywQ4v1hJvgpWlpHasQb6nZvPNWlMu";

            // 포트원 결제 검증 API 호출
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "PortOne " + PORTONE_API_SECRET);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            String portOneUrl = "https://api.portone.io/payments/" + URLEncoder.encode(impUid, "UTF-8");
            System.out.println("✅ 포트원 API 요청 URL: " + portOneUrl);

            ResponseEntity<Map> response = restTemplate.exchange(portOneUrl, HttpMethod.GET, entity, Map.class);

            if (response.getStatusCode() != HttpStatus.OK) {
                System.out.println("❌ 포트원 API 응답 실패: " + response);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", "결제 검증 실패"));
            }

            Map<String, Object> paymentData = response.getBody();
            System.out.println("✅ 포트원 API 응답: " + paymentData);

            System.out.println("✅ redirectUrl : ");

            // 결제 검증 완료 → 예약 확정 처리
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "결제 성공",
                    "redirectUrl", "/reservation/confirm?reservationDateId=" + dateId
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", "결제 검증 중 오류 발생"));
        }
    }

    @GetMapping("/reservation/confirm")
    public String confirm(@RequestParam("reservationDateId") String reservationDateId, Model model) {
        int id = Integer.parseInt(reservationDateId);

        Reservation reservation = reservationRepository.getReservationsByResvDateId(id);

        if (reservation == null) {
            return "error/404";
        }

        reservation.setResvStatus((byte) 2);
        reservationRepository.save(reservation);

        ReservationDate resvDate = resvDateRepository.getReservationDatesById(id);

        model.addAttribute("reservation", reservation);
        model.addAttribute("reservationDate", resvDate);

        return "reservation/confirm";
    }






}
