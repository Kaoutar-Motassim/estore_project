package com.estore.estore_backend.shopping.repository;

import com.estore.estore_backend.shopping.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}