package com.himedia.nuovo_project.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "members")
public class Member {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id; // 자동 증가되는 ID
  
  @Column(unique = true, nullable = false)
  private String memIdentifier ; // 회원가입 시 입력한 아이디 + 가입경로
  private String memPwd; // 비밀번호
  private String memName; // 이름

  @Column(columnDefinition = "null")
  private String memEmail; // 이메일

  private String memPhone; // 핸드폰번호
  @Column(name = "memBirthdate")
  private String memBirthdate;
  private int memGender; // 성별 (0: 남자, 1: 여자, 2: 선택안함)
  @Column(updatable = false)
  private String createdAt;  // 가입일자
  private String memMemo; // 관리자 메모
  
  
  public Member(String memIdentifier, String memPwd, String memName, String memEmail, String memPhone, String memBirthdate, int memGender) {
    this.memIdentifier = memIdentifier;
    this.memPwd = memPwd;
    this.memName = memName;
    this.memEmail = memEmail;
    this.memPhone = memPhone;
    this.memBirthdate = memBirthdate;
    this.memGender = memGender;
  }
  
  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
  }
}


