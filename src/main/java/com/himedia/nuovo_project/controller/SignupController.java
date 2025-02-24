package com.himedia.nuovo_project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SignupController {

    @RequestMapping("/member")
    public class MemberController {

        @GetMapping("/verifyResult")
        public String verifyResult(@RequestParam String imp_uid, Model model) {
            model.addAttribute("impUid", imp_uid);
            return "login/signup"; // 인증 결과를 보여줄 Thymeleaf 페이지
        }
    }


}
