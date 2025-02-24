package com.himedia.nuovo_project.controller;

import com.himedia.nuovo_project.dto.Cart;
import com.himedia.nuovo_project.dto.CartFood;
import com.himedia.nuovo_project.dto.Member;
import com.himedia.nuovo_project.repository.CartFoodRepository;
import com.himedia.nuovo_project.repository.CartRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CartRestController {

    @ModelAttribute("loginMember")
    public Member getLoginMember(HttpSession session) {
        return (Member) session.getAttribute("loginMember");
    }

    @Autowired
    CartRepository cartRepository;

    @Autowired
    CartFoodRepository cartFoodRepository;

    // 장바구니 추가하기
    @PostMapping("/addCart")
    public String addCart(@RequestParam("memberId") String memberId,
                          @RequestParam("menu_id") String menu_id,
                          @RequestParam("quantityStr") String quantityStr) {

        int memId = Integer.parseInt(memberId);
        int menuId = Integer.parseInt(menu_id);
        int quantity = Integer.parseInt(quantityStr);

        Cart cart = cartRepository.getCartsByMemId(memId);

        List<CartFood> foodList = cartFoodRepository.getAllByCartId(cart.getId());

        for (int i = 0; i < foodList.size(); i++) {
            if(foodList.get(i).getMenuId()==menuId){
                CartFood savedFood = foodList.get(i);
                quantity += savedFood.getQuantity();
                savedFood.setQuantity(quantity);
                cartFoodRepository.save(savedFood);
                return "plusQuantity";
            }
        }

        CartFood cartFood = new CartFood();
        cartFood.setCartId(cart.getId());
        cartFood.setMenuId(menuId);
        cartFood.setQuantity(quantity);

        System.out.println(cartFood.toString());

        cartFoodRepository.save(cartFood);

        return "addNew";
    }

    // 장바구니 삭제
    @PostMapping("/deleteCart")
    public String deleteCart(@RequestParam("menuId") String menuId,
                             @ModelAttribute("loginMember") Member loginMember){

        Cart cart = cartRepository.getCartsByMemId(loginMember.getId());
        List<CartFood> foodList = cartFoodRepository.getAllByCartId(cart.getId());


        for (int i = 0; i < foodList.size(); i++) {
            int menu_Id = Integer.parseInt(menuId);
            if(foodList.get(i).getMenuId()==menu_Id){
                CartFood savedFood = foodList.get(i);
                cartFoodRepository.delete(savedFood);
                return "deleteCart";
            }
        }

        return "deleteCart";
    }

    // 장바구니 수량 변경
    @PostMapping("/updateCart")
    public String updateCart(@RequestParam("menuId") String menuIdStr, @RequestParam("quantity") String quantityStr,
                             @ModelAttribute("loginMember") Member loginMember) {
       int menuId = Integer.parseInt(menuIdStr);
       int quantity = Integer.parseInt(quantityStr);

        Cart cart = cartRepository.getCartsByMemId(loginMember.getId());
        List<CartFood> foodList = cartFoodRepository.getAllByCartId(cart.getId());

        for (int i = 0; i < foodList.size(); i++) {
            if(foodList.get(i).getMenuId()==menuId){
                foodList.get(i).setQuantity(quantity);
                cartFoodRepository.save(foodList.get(i));
                return "updateCart";
            }
        }
        return "updateCart";
    }

    // 장바구니 가져오기
    @PostMapping("/bringCart")
    public List<CartFood> bringCart(@ModelAttribute("loginMember") Member loginMember) {
        Cart cart = cartRepository.getCartsByMemId(loginMember.getId());
        List<CartFood> foodList = cartFoodRepository.getAllByCartId(cart.getId());

        return foodList;
    }

    @GetMapping("/api/checkLoginStatus")
    public ResponseEntity<Map<String, Object>> checkLoginStatus(HttpSession session) {
        Member loginMember = (Member) session.getAttribute("loginMember");

        System.out.println("현재 로그인 상태 확인: " + loginMember); // 로그 추가

        boolean isLoggedIn = (loginMember != null);
        Map<String, Object> response = new HashMap<>();
        response.put("loggedIn", isLoggedIn);
        response.put("memberId", loginMember.getId()); // 사용자 ID 추가

        return ResponseEntity.ok(response);
    }


}
