package com.himedia.nuovo_project.controller;

import com.himedia.nuovo_project.dto.Inquiry;
import com.himedia.nuovo_project.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class MypageRestController {

    @Autowired
    InquiryRepository inquiryRepository;

    @PostMapping("/deletePost")
    public String deletePost(@RequestParam String inquiryId) {
        int postId = Integer.parseInt(inquiryId);
        Inquiry inquiry = inquiryRepository.getInquiryById(postId);

        inquiryRepository.delete(inquiry);

        return "success";
    }


}
