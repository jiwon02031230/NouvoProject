package com.himedia.nuovo_project.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "notices")
public class NoticeDto {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id; // 공지사항 ID
  
  @Column(nullable = false, length = 255)
  private String noticeTitle; // 공지사항 제목
  
  @Column(nullable = false, length = 255)
  private String noticeContent; // 공지 내용
  
  @Column(nullable = false)
  private Byte noticeType; // 0: 일반, 1: 중요
  
  @Column(nullable = false)
  private Integer noticeViews; // 조회수
  
  @Column(nullable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date noticeDate; // 등록 날짜
  
}
