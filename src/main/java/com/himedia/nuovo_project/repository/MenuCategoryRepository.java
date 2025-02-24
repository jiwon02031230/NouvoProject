package com.himedia.nuovo_project.repository;

import com.himedia.nuovo_project.dto.MenuCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Integer> {
    List<MenuCategory> findAllByOrderByIdAsc();
}
