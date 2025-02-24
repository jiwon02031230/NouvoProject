package com.himedia.nuovo_project.controller;

import com.himedia.nuovo_project.dto.Menu;
import com.himedia.nuovo_project.dto.MenuCategory;
import com.himedia.nuovo_project.repository.MenuCategoryRepository;
import com.himedia.nuovo_project.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;


// 파일 업로드 //
@Controller
public class AdmMenuController {
    @Autowired
    MenuRepository menuRepository;
    @Autowired
    MenuCategoryRepository menuCategoryRepository;

    @GetMapping("adm/menuadd")
    public String admMenuAdd(Model model) {

        return "admin/menu/menuAdmadd";
    }


    @PostMapping("/menuAddCom")
    public String upload(Model model, @RequestParam("file") MultipartFile file,
                         Menu menu) {


        try {
            // 현재 프로젝트의 절대경로
            Path currentPath = Paths.get("").toAbsolutePath();

            //저장 경로 //
            String path = "/src/main/resources/static/images/menu/";

            //카테고리 이름(파일명)
            String categoryName = "";

            // 업로드된 이미지의 파일명
            String fileName = file.getOriginalFilename();
            System.out.println("컨트롤러에서 파일명: " + fileName);

            switch (menu.getMenuCategory()) {
                case (1):
                    categoryName = "new1/";
                    break;
                case (2):
                    categoryName = "salad2/";
                    break;
                case (3):
                    categoryName = "steak3/";
                    break;
                case (4):
                    categoryName = "pizzapasta4/";
                    break;
                case (5):
                    categoryName = "pilafRisotto5/";
                    break;
                case (6):
                    categoryName = "beverage6/";
                    break;
                default:
                    break;
            }

            String realPath = currentPath + path + categoryName;

            //파일 경로랑 파일의 이름을 결합해서 파일의 전체 경로를 저장//
            Path filePath = Paths.get(realPath, fileName);

            //파일을 전송 (파일 저장)
            file.transferTo(filePath);
            model.addAttribute("msg", "성공!");

            menu.setMenuImageUrl(categoryName+fileName);

            LocalDate localDate = LocalDate.now();
            menu.setCreatedDate(localDate);


//            if ( menu.getMenuProtein() == 0) {
//                menu.setMenuProtein(null);
//            }


            System.out.println("=================================="+menu.getMenuProtein());

            //메뉴 저장
            menuRepository.save(menu);

        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("msg", "업로드 실패: " + e.getMessage());
        }


        return "redirect:/adm/menu";
    }

    // menu 페이지 (메뉴 카테고리 + 메뉴 불러오기)
    @GetMapping("/adm/menu")
    public String menuAdm(Model model) {
        // 메뉴와 카테고리 가져오기
        List<Menu> menuList = menuRepository.findAll();
        List<MenuCategory> categories = menuCategoryRepository.findAll();

        model.addAttribute("categories", categories);
        model.addAttribute("menuList", menuList);
        String categoryType = "all";
        model.addAttribute("categoryType", categoryType);
        return "admin/menu/menuAdm"; // 결과를 보여줄 템플릿
    }


    // 메뉴 검색
    @PostMapping("/adm/menu/search")
    public String searchMenu(@RequestParam String menuSearch, @RequestParam String menuSkeyword, Model model) {
        List<Menu> menuSearchList;

        // 검색 조건에 따라 메뉴 목록을 가져오는 로직
        switch (menuSearch) {
            case "title":
                menuSearchList = menuRepository.findByMenuNameContaining(menuSkeyword); // 이름으로 검색
                break;
            case "substance":
                int price = Integer.parseInt(menuSkeyword);
                menuSearchList = menuRepository.findByMenuPrice(price); // 가격으로 검색
                break;
            default:
                menuSearchList = menuRepository.findAll(); // 기본적으로 모든 메뉴 불러오기
                break;
        }
        List<MenuCategory> categories = menuCategoryRepository.findAll();
        String categoryType = "all";
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("categories", categories);

        model.addAttribute("menuList", menuSearchList); // 검색 결과를 모델에 추가
        return "admin/menu/menuAdm"; // 결과를 보여줄 템플릿
    }

    @PostMapping("/adm/category/search")
    public String searchCategory(@RequestParam(value = "categoryType", required = false, defaultValue = "all") String categoryType,
                                 Model model) {
        List<Menu> menuSearchList;

        switch (categoryType) {
            case "1":
                menuSearchList = menuRepository.getMenusByMenuCategory(1);
                break;
            case "2":
                menuSearchList = menuRepository.getMenusByMenuCategory(2);
                break;
            case "3":
                menuSearchList = menuRepository.getMenusByMenuCategory(3);
                break;
            case "4":
                menuSearchList = menuRepository.getMenusByMenuCategory(4);
                break;
            case "5":
                menuSearchList = menuRepository.getMenusByMenuCategory(5);
                break;
            case "6":
                menuSearchList = menuRepository.getMenusByMenuCategory(6);
                break;
            default:
                menuSearchList = menuRepository.findAll();
                categoryType = "all"; // 기본값 설정
                break;
        }

        List<MenuCategory> categories = menuCategoryRepository.findAll();
        model.addAttribute("categories", categories);
        model.addAttribute("menuList", menuSearchList);
        model.addAttribute("categoryType", categoryType); // 선택된 카테고리 유지

        return "admin/menu/menuAdm";
    }


}













