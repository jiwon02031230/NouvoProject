package com.himedia.nuovo_project.controller;

import com.himedia.nuovo_project.dto.Cart;
import com.himedia.nuovo_project.dto.CartFood;
import com.himedia.nuovo_project.dto.Member;
import com.himedia.nuovo_project.dto.Menu;
import com.himedia.nuovo_project.repository.CartFoodRepository;
import com.himedia.nuovo_project.repository.CartRepository;
import com.himedia.nuovo_project.repository.MenuRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.ArrayList;
import java.util.List;

@Controller
public class CartController {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    CartFoodRepository cartFoodRepository;

    @Autowired
    MenuRepository menuRepository;

    // 세션 활용하기

    @ModelAttribute("loginMember")
    public Member getLoginMember(HttpSession session) {
        return (Member) session.getAttribute("loginMember");
    }

    // 장바구니
    @GetMapping("/cart")
    public String cart(@ModelAttribute("loginMember") Member loginMember, Model model) {
        if (loginMember == null) {
            return "redirect:/login";
        }

        Cart cart = cartRepository.getCartsByMemId(loginMember.getId());

        List<CartFood> cartList = cartFoodRepository.getAllByCartIdOrderByCartId(cart.getId());
        model.addAttribute("cartList", cartList);
        if (cartList != null){
            List<Menu> menuList = new ArrayList<Menu>();
            for (CartFood food : cartList) {
                menuList.add(menuRepository.getById(food.getMenuId()));
            }
            model.addAttribute("menuList", menuList);
        }



        return "common/cart";
    }

}
