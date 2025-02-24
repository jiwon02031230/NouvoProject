package com.himedia.nuovo_project.dto;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Faq {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String faqQuestion;

    private String faqAnswer;


}