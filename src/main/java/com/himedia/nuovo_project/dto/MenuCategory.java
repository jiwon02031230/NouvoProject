package com.himedia.nuovo_project.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Category")
public class MenuCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // 자동 증가되는 ID

    private String categoryName; // 카테고리 이름 (유니크 제약 조건)

}
