package com.himedia.nuovo_project.repository;

import com.himedia.nuovo_project.dto.CartFood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartFoodRepository extends JpaRepository<CartFood, Integer> {
    CartFood getCartFoodsByCartId(int cartId);

    List<CartFood> getAllByCartId(int cartId);

    List<CartFood> getAllByCartIdOrderByCartId(int cartId);
}
