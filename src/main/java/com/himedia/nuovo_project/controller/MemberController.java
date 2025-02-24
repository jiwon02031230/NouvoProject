package com.himedia.nuovo_project.controller;

import com.himedia.nuovo_project.dto.Cart;
import com.himedia.nuovo_project.dto.Member;
import com.himedia.nuovo_project.repository.CartRepository;
import com.himedia.nuovo_project.repository.MemberRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;


@Controller
public class MemberController {

  @Autowired
  private MemberRepository memberRepository;

  @Autowired
  private CartRepository cartRepository;

  // 로그인
  @GetMapping("/login")
  public String login(Model model){

    model.addAttribute("loginfail", false);

    return "login/login";
  }

  // 로그아웃
  @GetMapping("/logout")
  public String logout(HttpSession session) {
    session.invalidate(); // 세션 삭제
    return "redirect:/main"; // 로그아웃 후 메인 페이지로 이동
  }


  // 로그인 - 아이디&비번확인 => 성공 시 세션에 회원정보 저장 & 실패 시 모달창 띄우기
  @PostMapping("/checkLogin")
  public String CheckLogin(String id, String pwd, Model model, HttpSession session) {
    List<Member> memList = memberRepository.findAll();
    System.out.printf("아이디 체크");
    System.out.println(id+": 아이디!!!!!!!!!!!!!!!!!!!11111");
    System.out.println(pwd+": 비번!!!!!!!!!!!!!!!!!!!11111");
    for (Member member : memList) {
      String mempwd = member.getMemPwd();
      String memId = member.getMemIdentifier();
      String memName = member.getMemName();

      if (memId.equals(id) && mempwd.equals(pwd)) {
        // 세션에 회원 정보 저장
        session.setAttribute("loginMember", member);

        // 세션 유지 시간 30분 설정 (초 단위)
        session.setMaxInactiveInterval(1800);

        model.addAttribute("alertMessage", "로그인 성공!!");
        model.addAttribute("memName", memName);
        model.addAttribute("loginResult", true);
        System.out.println("로그인 성공!!!");

        // 로그인 된 아이디 값으로 장바구니 db 데이터가 있는지 확인
        Cart memCart = cartRepository.getCartsByMemId(member.getId());
        Cart newCart = new Cart();

        // 없으면 만들고 저장
        if (memCart == null) {
          newCart.setMemId(member.getId());
          cartRepository.save(newCart);
        }

        return "redirect:/main"; // 로그인 성공 시 메인 페이지로 이동
      } else if (id.equals("admin01")&&pwd.equals("111222")) {
        return "redirect:/adm/member";
      }
    }

    // 로그인 실패 시 모달 띄우기
    model.addAttribute("alertMessage", "아이디와 비밀번호가 일치하지 않습니다");
    model.addAttribute("loginfail", true);
    System.out.println("실패실패실패");
    return "login/login";
  }


  // 일반 회원가입
  @GetMapping("/sign_up")
  public String signup() {
    return "login/signup";
  }

  // 아이디 찾기
  @GetMapping("/findId")
  public String findId() {
    return "login/findId";
  }

  // 비밀번호 찾기
  @GetMapping("/findPwd")
  public String findPwd() {
    return "login/findPwd";
  }

  // 일반 회원가입 처리
  @PostMapping("/memberjoin")
  public String signup(String memid, String memPwd,
                       String birthyear, String birthmonth, String birthday,
                       String memEmail, String memName, String memPhone,
                       Integer memGender) {

    System.out.println(memid);

    Member member = new Member();

    String phone = memPhone.substring(0,3) + "-" +
            memPhone.substring(3,7) + "-" +
            memPhone.substring(7,11);
    member.setMemPhone(phone);
    member.setMemIdentifier(memid);
    member.setMemPwd(memPwd);
    member.setMemName(memName);

    // 생년월일을 LocalDate로 변환
    if (birthyear=="" && birthmonth =="" && birthday =="") {
      member.setMemBirthdate(null);
    } else {
      String birthDate = birthyear + birthmonth + birthday;
      member.setMemBirthdate(birthDate); // LocalDate 저장
    }

    if (memEmail==""){
      member.setMemEmail(null);
    }

    // 성별 처리
    if (memGender == null) { // Integer 타입이므로 null 체크
      memGender = 2; // 기본값 설정: 선택안함
    }
    member.setMemGender(memGender); // 성별 값 저장


    memberRepository.save(member);

    return "redirect:/login";
  }

}// end
