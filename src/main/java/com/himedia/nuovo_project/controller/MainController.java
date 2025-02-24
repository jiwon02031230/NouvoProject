package com.himedia.nuovo_project.controller;

import com.himedia.nuovo_project.dto.Member;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MainController {


    //01. 소개
    @GetMapping("/aboutus")
    public String aboutus() {
        return "aboutus/aboutus";
    }


    // 메인페이지
    @GetMapping("/main")
    public String showMainPage(Model model) {
        model.addAttribute("loginResult", false);
        System.out.println("main으로 이동");
        return "main"; // main 페이지로 이동
    }

    // 세션 활용하기

    @ModelAttribute("loginMember")
    public Member getLoginMember(HttpSession session) {
        return (Member) session.getAttribute("loginMember");
    }


    // 관리자 페이지 (01. 메인-예약 관리)
    @GetMapping("/adm/reservation")
    public String reservationAdm() {
        return "admin/reservation/reservationAdm";
    }

    // 관리자 페이지(01. 예약 - 예약날짜 설정)
    @GetMapping("/adm/resvSetting")
    public String resvSettingAdm() {
        return "admin/reservation/resvSettingAdm";
    }

    // 관리자 페이지(01. 예약 - 예약날짜 수정)
    @GetMapping("/adm/resvUpdate")
    public String resvUpdateAdm() {
        return "admin/reservation/resvUpdateAdm";
    }


    // 관리자 페이지 (02. 회원 관리 수정)
    @GetMapping("/adm/memberupd")
    public String memberupd() {
        return "admin/member/memberAdmupd";
    }

    // 관리자 페이지 (02. 회원 관리 조회)
    @GetMapping("/adm/memberview")
    public String memberAdmview() {
        return "admin/member/memberAdmview";
    }

    // 관리자 페이지 (03. 고객지원 관리)
    @GetMapping("/adm/community")
    public String communityAdm() {
        return "admin/community/communityAdm";
    }

    // 관리자 페이지(03. 고객지원-공지사항)
    @GetMapping("/adm/community/notice")
    public String communityAdmnotice() {
        return "admin/community/communityAdmnotice";
    }
    // 관리자 페이지(03. 고객지원-공지사항 수정!!)
    @GetMapping("/adm/community/noticeupd")
    public String communityAdmnotiupd() {
        return "admin/community/communityAdmnotiupd";
    }

    // 관리자 페이지(03. 고객지원-공지사항 추가!!)
    @GetMapping("/adm/community/noticeadd")
    public String communityAdmnotiadd() {
        return "admin/community/communityAdmnotiadd";
    }

    // 관리자 페이지(03. 고객지원-FAQ)
    @GetMapping("/adm/communityfaq")
    public String communityAdmfaq() {
        return "admin/community/communityAdmfaq";
    }




    //관리자 페이지 (04. 메뉴 수정)
    @GetMapping("/adm/menuupd")
    public String updmenuAdm() {
        return "admin/menu/menuAdmupd";
    }

    //관리자 페이지 (04. 메뉴 카테고리 수정/추가)
    @GetMapping("/adm/menucategory")
    public String menucategory() {
        return "admin/menu/menuAdmcategory";
    }


}