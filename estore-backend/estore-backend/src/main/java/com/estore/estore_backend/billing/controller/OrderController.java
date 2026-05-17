package com.estore.estore_backend.billing.controller;

import com.estore.estore_backend.billing.dto.CreateOrderRequest;
import com.estore.estore_backend.billing.dto.UpdateOrderStatusRequest;
import com.estore.estore_backend.billing.entity.Order;
import com.estore.estore_backend.billing.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        return ResponseEntity.status(201).body(orderService.createOrder(request));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    // New: seller sees orders for their products
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<Order>> getOrdersBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(orderService.getOrdersBySellerId(sellerId));
    }

    // New: seller accepts/refuses an order
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody UpdateOrderStatusRequest req) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, req.getStatus()));
    }

    // Admin: all orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}
