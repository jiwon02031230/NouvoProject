package com.himedia.nuovo_project.repository;

import com.himedia.nuovo_project.dto.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Cart getCartsByMemId(int memId);
}
