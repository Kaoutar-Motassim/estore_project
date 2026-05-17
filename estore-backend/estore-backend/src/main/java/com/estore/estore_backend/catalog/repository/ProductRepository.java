package com.estore.estore_backend.catalog.repository;

import com.estore.estore_backend.catalog.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String keyword);
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findBySellerId(Long sellerId);
}
