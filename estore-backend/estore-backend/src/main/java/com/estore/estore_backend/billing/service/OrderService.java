package com.estore.estore_backend.billing.service;

import com.estore.estore_backend.billing.dto.CreateOrderRequest;
import com.estore.estore_backend.billing.entity.*;
import com.estore.estore_backend.billing.repository.*;
import com.estore.estore_backend.customer.entity.User;
import com.estore.estore_backend.customer.repository.UserRepository;
import com.estore.estore_backend.inventory.service.InventoryService;
import com.estore.estore_backend.shopping.entity.*;
import com.estore.estore_backend.shopping.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final InventoryService inventoryService;

    @Transactional
    public Order createOrder(CreateOrderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        List<Cart> carts = cartRepository.findByUserId(request.getUserId());
        if (carts.isEmpty()) throw new RuntimeException("Panier introuvable");
        Cart cart = carts.get(0);

        if (cart.getItems() == null || cart.getItems().isEmpty())
            throw new RuntimeException("Le panier est vide");

        Order order = Order.builder()
                .user(user)
                .orderDate(LocalDateTime.now())
                .totalAmount(0.0)
                .status("PENDING")
                .items(new ArrayList<>())
                .build();

        Order savedOrder = orderRepository.save(order);
        double total = 0;

        for (CartItem cartItem : cart.getItems()) {
            inventoryService.reduceStock(cartItem.getProduct().getId(), cartItem.getQuantity());
            total += cartItem.getUnitPrice() * cartItem.getQuantity();

            OrderItem orderItem = OrderItem.builder()
                    .order(savedOrder)
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .unitPrice(cartItem.getUnitPrice())
                    .build();

            orderItemRepository.save(orderItem);
            savedOrder.getItems().add(orderItem);
        }

        savedOrder.setTotalAmount(total);
        orderRepository.save(savedOrder);

        cart.getItems().clear();
        cartRepository.save(cart);

        return savedOrder;
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande introuvable"));
    }

    // New: get orders containing products sold by a specific seller
    public List<Order> getOrdersBySellerId(Long sellerId) {
        List<Order> allOrders = orderRepository.findAll();
        return allOrders.stream()
                .filter(order -> order.getItems().stream()
                        .anyMatch(item -> item.getProduct().getSeller() != null
                                && item.getProduct().getSeller().getId().equals(sellerId)))
                .collect(Collectors.toList());
    }

    // New: update order status (seller accepts/refuses)
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Commande introuvable"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    // Admin: get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
