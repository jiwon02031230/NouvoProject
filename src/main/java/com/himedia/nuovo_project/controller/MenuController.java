package com.himedia.nuovo_project.controller;

import com.himedia.nuovo_project.dto.Menu;
import com.himedia.nuovo_project.dto.MenuCategory;
import com.himedia.nuovo_project.repository.MenuCategoryRepository;
import com.himedia.nuovo_project.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
public class MenuController {

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    MenuCategoryRepository categoryRepository;

    // menu 페이지 (메뉴 카테고리 + 메뉴 불러오기)
    @GetMapping("/menu")
    public String menu(Model model) {

        // 메뉴 가져오기
        List<Menu> menuList = menuRepository.findAll();

        // 카테고리 가져오기
        List<MenuCategory> categories = categoryRepository.findAllByOrderByIdAsc();
        model.addAttribute("categories", categories);

        // 카테고리별로 메뉴를 그룹핑
        Map<Integer, List<Menu>> categorizedMenus = menuList.stream()
                .collect(Collectors.groupingBy(Menu::getMenuCategory));
        model.addAttribute("categorizedMenus", categorizedMenus);
//         확인용
//        System.out.println(newMenuList);
        System.out.println("menu method 실행");

        return "menu/menu";
    }

}
