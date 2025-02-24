package com.himedia.nuovo_project.controller;

import com.himedia.nuovo_project.dto.*;
import com.himedia.nuovo_project.repository.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Controller
public class MypageController {

  @Autowired
  private InquiryRepository inquiryRepository;
  @Autowired
  private MemberRepository memberRepository;
  @Autowired
  private ReplyRepository replyRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private ResvDateRepository resvDateRepository;

  // 세션 활용
  @ModelAttribute("loginMember")
  public Member getLoginMember(HttpSession session) {
    return (Member) session.getAttribute("loginMember");
  }


  @GetMapping("/inquiry")
  public String inquiry(Model model, @ModelAttribute("loginMember") Member loginMember) {
    if (loginMember == null) {
      return "redirect:/login"; // 로그인 안 한 경우 로그인 페이지로 리다이렉트
    }

    List<Inquiry> inquiryList = inquiryRepository.getInquiriesByInquiryAuthorOrderByIdDesc(loginMember.getId());
    System.out.println("id값!!!!!!!!!!!!!!!!" + loginMember.getId());

    System.out.println("문의내역 :::::::::::::::::::" + inquiryList);

    model.addAttribute("inquiries", inquiryList);

    return "mypage/mypageMain";
  }

  //문의하기
  @GetMapping("/form")
  public String form() {

    return "mypage/form";
  }

  // 문의내역 저장
  @PostMapping("/saveInquiry")
  public String saveInquiry(String title, String content, @ModelAttribute("loginMember") Member loginMember) {

    Inquiry inquiry = new Inquiry();
    inquiry.setInquiryAuthor(loginMember.getId());
    inquiry.setInquiryTitle(title);
    inquiry.setInquiryContent(content);
    inquiry.setInquiryDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
    inquiry.setInquiryStatus(0);

    inquiryRepository.save(inquiry);
    return "redirect:/inquiry";
  }

  //문의내역 게시글 클릭!! 댓글 있음!!
  @GetMapping("/inquiry/detail")
  public String formdetail(Model model,
                           @RequestParam("id") int id) {

    System.out.println("🛑🛑문의내역 id값 : "+ id);
    //넘어온 id값(문의내역id)으로 문의내역 찾기
    Inquiry inquiry = inquiryRepository.getById(id);

    //inquiryAuthor에 해당하는 Member를 찾음
    Member member = memberRepository.getById(inquiry.getInquiryAuthor());
    System.out.println("🛑🛑memeber id값 : "+ member.getId());

    List<Reply> replies = replyRepository.getRepliesByBoardId(id);
    System.out.println("🛑🛑replies : "+ replies);

    model.addAttribute("inquiry", inquiry);
    model.addAttribute("replies", replies);
    model.addAttribute("member", member);

    return "mypage/formdetail";
  }

  //문의내역 게시글 클릭!! 댓글 없음!!
  @GetMapping("/inquiry/detailnore")
  public String formdetailnore() {


    return "mypage/formdetailnore";
  }

  // 예약 내역
  @GetMapping("/greservation")
  public String greservation(@ModelAttribute("loginMember") Member loginMember, Model model) {
    if (loginMember == null) {
      return "redirect:/login";
    }
    // 로그인 된 id 값으로 예약 내역 불러오기
    List<Reservation> reservationList = reservationRepository.getReservationsByResvMemId(loginMember.getId());

    // 예약 내역 분류(미방문 / 방문+취소)
    List<Reservation> validResv = new ArrayList<>();
    List<Reservation> invalidResv = new ArrayList<>();

    // 예약 날짜 리스트
    List<ReservationDate> resvDateList = new ArrayList<>();

    for (Reservation reservation : reservationList) {
      if (reservation.getResvStatus()==2){
        validResv.add(reservation);
      }else if(reservation.getResvStatus() == 2 || reservation.getResvStatus() == 1){
        invalidResv.add(reservation);
      }
      resvDateList.add(resvDateRepository.getReservationDateById(reservation.getResvDateId()));
    }

    model.addAttribute("validResv", validResv);
    model.addAttribute("invalidResv", invalidResv);
    model.addAttribute("rDate", resvDateList);

    return "mypage/greservation";
  }

  //05.마이페이지

  @GetMapping("/greservation/detail/{id}")
  public String greservationdetail(@PathVariable("id") String id, Model model) {

    int resvId = Integer.parseInt(id);

    Reservation reservation = reservationRepository.getById(resvId);

    if (reservation.getPayDate()==null){
      reservation.setPayDate(LocalDate.now());
    }

    ReservationDate reservationDate = resvDateRepository.getReservationDateById(reservation.getResvDateId());

    model.addAttribute("resv", reservation);
    model.addAttribute("rDate", reservationDate);

    return "mypage/greservationdetail";
  }

  @GetMapping("/inquiry/details")
  public String details() {
    return "mypage/details";
  }

  @GetMapping("/info")
  public String info() {
    return "mypage/info";
  }


  // 개인정보 수정 : 비밀번호 입력 //
  @PostMapping("/savedInfo")
  public String update(@ModelAttribute("loginMember") Member loginMember,
                       @RequestParam("memPwd") String memPwd,
                       Model model) {
    // 로그인한 멤버의 비밀번호를 가져옵니다.
    String storedPwd = loginMember.getMemPwd(); // 로그인한 멤버의 비밀번호를 가져오는 메서드

    // 입력한 비밀번호와 로그인한 멤버의 비밀번호가 같은지 확인합니다.
    if (storedPwd.equals(memPwd)) {
      // 비밀번호가 일치할 경우 다음 페이지로 이동
      model.addAttribute("memberId", loginMember.getId());
      return "redirect:/inquiry/update"; // 다음 페이지로 이동
    }

    // 비밀번호가 다를 경우 처리 (예: 에러 메시지 추가)
    model.addAttribute("errorMessage", "비밀번호가 일치하지 않습니다.");
    return "mypage/error"; // 에러 페이지로 이동
  }

  // 개인정보 수정 수정 페이지 //
  @GetMapping("/inquiry/update")
  public String update(@ModelAttribute("loginMember") Member loginMember, Model model) {
    int id = loginMember.getId();

    Member member = memberRepository.getById(id);
    model.addAttribute("member", member);


    return "mypage/infoupdate";
  }


  //  수정된 개인정보 데이타 베이스 저장하기

  @PostMapping("/update")
  public String updateMemberInfo(@ModelAttribute("loginMember") Member loginMember,
                                 @RequestParam("memPhone") String memPhone,
                                 @RequestParam("newPassword") String newPassword,
                                 @RequestParam("memEmail") String memEmail,
                                 @RequestParam("birthyear") String birthYear,
                                 @RequestParam("birthmonth") String birthMonth,
                                 @RequestParam("birthday") String birthDay,
                                 @RequestParam("gender") int gender) {

    String savedBirthDay = birthYear + birthMonth + birthDay;

    Member member = memberRepository.getMemberById(loginMember.getId());

    if (memPhone == "") {
      member.setMemPhone(null);
    } else {
      member.setMemPhone(memPhone);
    }

    if (memEmail == "") {
      member.setMemEmail(null);
    } else {
      member.setMemEmail(memEmail);
    }

    if (newPassword == "") {
      member.setMemPwd(null);
    } else {
      member.setMemPwd(newPassword);
    }

    if (savedBirthDay == "") {
      member.setMemBirthdate(null);
    } else {
      member.setMemBirthdate(savedBirthDay);
    }

    member.setMemGender(gender);
    memberRepository.save(member);


    return "redirect:/inquiry"; // 수정 후 보여줄 페이지
  }
}

