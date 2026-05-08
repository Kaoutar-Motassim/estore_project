package com.estore.estore_backend.shopping.repository;

import com.estore.estore_backend.shopping.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserId (Long userId);
}