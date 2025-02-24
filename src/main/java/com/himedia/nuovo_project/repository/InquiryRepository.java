package com.himedia.nuovo_project.repository;

import com.himedia.nuovo_project.dto.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InquiryRepository extends JpaRepository<Inquiry, Integer> {

    List<Inquiry> id(int id);

    List<Inquiry> getInquiriesByInquiryAuthorOrderByIdDesc(int id);


    Inquiry getInquiryById(int id);
}

