package com.himedia.nuovo_project.repository;

import com.himedia.nuovo_project.dto.Faq;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FaqRepository extends JpaRepository<Faq, Integer> {

}