package com.himedia.nuovo_project.controller;

import com.himedia.nuovo_project.repository.MenuCategoryRepository;
import com.himedia.nuovo_project.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/adm")
public class AdmMenuRestController {

    @Autowired
    MenuRepository menuRepository;
    @Autowired
    MenuCategoryRepository menuCategoryRepository;

    @DeleteMapping("/menus")
    public ResponseEntity<String> deleteMenu(@RequestParam("menuIds") List<Integer> menuIds) {
        menuRepository.deleteAllById(menuIds);

        // 성공적으로 삭제되었음을 나타내는 응답 반환
        return ResponseEntity.ok("메뉴가 성공적으로 삭제되었습니다.");
    }
}

