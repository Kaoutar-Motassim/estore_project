package com.estore.estore_backend.inventory.repository;

import com.estore.estore_backend.inventory.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByProductId(Long productId); //recupere le stock
}