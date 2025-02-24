package com.himedia.nuovo_project.repository;

import com.himedia.nuovo_project.dto.NoticeDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<NoticeDto, Integer> {

  List<NoticeDto> findAllByOrderByIdDesc();

    List<NoticeDto> findAllByOrderByNoticeTypeDescIdDesc();

    List<NoticeDto> findByNoticeTitleContainingOrderByNoticeTypeDescIdDesc(String searchKeyword);

    List<NoticeDto> findByNoticeContentContainingOrderByNoticeTypeDescIdDesc(String searchKeyword);

  List<NoticeDto> findByNoticeContentContainingOrNoticeTitleContainingOrderByIdDesc(String searchKeyword, String searchKeyword1);
}
