package com.himedia.nuovo_project.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Menu {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @Column(name = "menu_category", nullable = false) // 외래 키로 설정
        private int menuCategory; // Category 엔티티와의 관계

        private String menuName;

        private int menuPrice;

        private int menuKcal;

        private int menuProtein;

        private int menuNa;

        private int menuSugar;

        private String menuAllergens;

        @Lob
        private String menuImageUrl; // 이미지 url

        @Column(nullable = false, updatable = false)
        private LocalDate createdDate;


}
