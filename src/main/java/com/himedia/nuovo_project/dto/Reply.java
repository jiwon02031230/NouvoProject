package com.himedia.nuovo_project.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "reply")
public class Reply {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id; // 자동 증가되는 ID

  private int adminId;

  private int boardId;

  private String replyContent;

  private LocalDateTime replyDate;
  
}

