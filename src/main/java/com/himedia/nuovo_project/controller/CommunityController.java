package com.himedia.nuovo_project.controller;

import com.himedia.nuovo_project.dto.Faq;
import com.himedia.nuovo_project.dto.Member;
import com.himedia.nuovo_project.dto.NoticeDto;
import com.himedia.nuovo_project.repository.FaqRepository;
import com.himedia.nuovo_project.repository.NoticeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class CommunityController {

  @Autowired
  NoticeRepository noticeRepository;

  @Autowired
  FaqRepository faqRepository;

  @GetMapping("/community")
  public String community(Model model) {
    System.out.println("community 실행됨!");

    List<NoticeDto> notiesList;
    notiesList = noticeRepository.findAllByOrderByNoticeTypeDescIdDesc(); // 모든 공지 반환
    model.addAttribute("notiesList", notiesList);

    return "community/communityMain"; // 결과 페이지로 이동
  }


  //공지사항 detail 페이지
  @GetMapping("/community/noticedetail/{noticeId}")
  public String noticedetail(Model model, @PathVariable int noticeId) {
    System.out.println("community noticedetail 실행됨!");

    // 조회수 증가 로직
    NoticeDto notice = noticeRepository.findById(noticeId)
            .orElseThrow(() -> new EntityNotFoundException("게시글을 찾을 수 없습니다. ID: " + noticeId));
    notice.setNoticeViews(notice.getNoticeViews() + 1);
    noticeRepository.save(notice);
    model.addAttribute("notice", notice);
    model.addAttribute("previousPage","/community");
    return "community/noticedetail";
  }


  // FAQ 페이지 (질문 + 답변 불러오기)
  @GetMapping("/faq")

  public String faq (Model model) {
    // 질문 가져오기

    List<Faq> faqlist= faqRepository.findAll();
    model.addAttribute("faqlist", faqlist );


    System.out.println("faq 실행");

    return "community/faq";
  }

  // 공지사항 검색!!!   //
  @PostMapping("/community/search")
  public String searchCommunity(@RequestParam String searchType, @RequestParam String searchKeyword, Model model) {
    List<NoticeDto> notiesList;

    // 검색 조건에 따라 공지사항 목록을 가져오는 로직
    switch (searchType) {
      case "title":
        notiesList = noticeRepository.findByNoticeTitleContainingOrderByNoticeTypeDescIdDesc(searchKeyword); // 제목으로 검색
        break;
      case "substance":
        notiesList = noticeRepository.findByNoticeContentContainingOrderByNoticeTypeDescIdDesc(searchKeyword); // 내용으로 검색
        break;
      case "combine":
        notiesList = noticeRepository.findByNoticeContentContainingOrNoticeTitleContainingOrderByIdDesc(searchKeyword, searchKeyword); // 제목과 내용으로 검색
        break;
      case "all":
        notiesList = noticeRepository.findAllByOrderByNoticeTypeDescIdDesc();
        break;
      default:
        notiesList = noticeRepository.findAllByOrderByNoticeTypeDescIdDesc();// 기본적으로 모든 공지사항 불러오기
        break;
    }

    model.addAttribute("notiesList", notiesList);
    model.addAttribute("keyword",searchKeyword);
    model.addAttribute("type",searchType);
    return "community/communityMain"; // 결과를 보여줄 템플릿
  }

}
