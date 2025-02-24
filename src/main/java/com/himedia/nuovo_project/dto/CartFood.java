package com.himedia.nuovo_project.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class CartFood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int cartId;
    private int quantity;
    private int menuId;
}
