package com.himedia.nuovo_project.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "inquiry")
public class Inquiry {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id; // 자동 증가되는 ID
  
  @Column(name = "inquiry_title")
  private String inquiryTitle;
  
  @Column(name = "inquiry_content")
  private String inquiryContent;
  
  @Column(name = "inquiry_author")
  private int inquiryAuthor;
  
  @Column(name = "inquiry_date")
  private String inquiryDate;
  
  @Column(name = "inquiry_status")
  private int inquiryStatus;
  

}
