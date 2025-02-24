package com.himedia.nuovo_project.repository;

import com.himedia.nuovo_project.dto.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Integer> {


    List<Menu> getMenusByMenuCategory(int i);

    Menu getMenusByMenuName(String menuName);

    List<Menu> findByMenuNameContaining(String menuSkeyword);

    List<Menu> findByMenuPrice(int price);
}
