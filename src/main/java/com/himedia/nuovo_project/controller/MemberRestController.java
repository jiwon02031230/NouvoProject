package com.himedia.nuovo_project.controller;

import com.himedia.nuovo_project.dto.Member;
import com.himedia.nuovo_project.repository.MemberRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("")
public class MemberRestController {

  @Autowired
  private MemberRepository memberRepository;

  // 세션 활용하기

  @ModelAttribute("loginMember")
  public Member getLoginMember(HttpSession session) {
    return (Member) session.getAttribute("loginMember");
  }


  @GetMapping("/memberlist")
  public List<String> memberlist() {
    List<Member> memberList = memberRepository.findAll();
    List<String> idList = new ArrayList<>();
    
    for (Member member : memberList) {
      String memId = member.getMemIdentifier();
      // ID가 "_"를 포함하는지 체크
      if (memId.contains("_")) {
        idList.add(memId.split("_")[0]); // ID 추가
      } else {
        idList.add(memId); // "_"가 없으면 원본 ID 추가
      }
    }
    return idList;
  }



}
