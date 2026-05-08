package com.estore.estore_backend.billing.repository;

import com.estore.estore_backend.billing.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}