package com.himedia.nuovo_project.controller;

import com.himedia.nuovo_project.dto.Member;
import com.himedia.nuovo_project.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;


@Controller
public class AdmMemberController {
    @Autowired
    MemberRepository memberRepository;

    // 모든 회원 불러오기
    @GetMapping("/adm/member")
    public String memberAdm(Model model) {
        List<Member> memberList = memberRepository.findAll();
        model.addAttribute("memberList", memberList);
        return "admin/member/memberAdm"; // 결과를 보여줄 템플릿
    }

    // 회원 검색
    @PostMapping("/adm/member/search")
    public String searchMembers(@RequestParam String searchType, @RequestParam String searchKeyword, Model model) {
        List<Member> memberList;

        // 검색 조건에 따라 회원 목록을 가져오는 로직
        switch (searchType) {
            case "name":
                memberList = memberRepository.findByMemNameContaining(searchKeyword); // 이름으로 검색
                break;
            case "uid":
                memberList = memberRepository.findByMemIdentifierContaining(searchKeyword); // 아이디로 검색
                break;
            case "tel":
                memberList = memberRepository.findByMemPhoneContaining(searchKeyword); // 연락처로 검색
                break;
            case "email":
                memberList = memberRepository.findByMemEmailContaining(searchKeyword); // 이메일로 검색
                break;
            default:
                memberList = memberRepository.findAll(); // 기본적으로 모든 회원 불러오기
                break;
        }

        model.addAttribute("memberList", memberList);
        return "admin/member/memberAdm"; // 결과를 보여줄 템플릿
    }
}
