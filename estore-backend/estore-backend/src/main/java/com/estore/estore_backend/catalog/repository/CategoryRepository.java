package com.estore.estore_backend.catalog.repository;

import com.estore.estore_backend.catalog.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}