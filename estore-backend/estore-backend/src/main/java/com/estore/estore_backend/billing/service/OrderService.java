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
        if (carts.isEmpty()) {
            throw new RuntimeException("Panier introuvable");
        }
        Cart cart = carts.get(0);

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("Le panier est vide");
        }

        // Créer la commande d'abord sans les items
        Order order = Order.builder()
                .user(user)
                .orderDate(LocalDateTime.now())
                .totalAmount(0.0)
                .status("CONFIRMED")
                .items(new ArrayList<>())
                .build();

        Order savedOrder = orderRepository.save(order);

        double total = 0;

        for (CartItem cartItem : cart.getItems()) {
            inventoryService.reduceStock(
                    cartItem.getProduct().getId(),
                    cartItem.getQuantity()
            );

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

        // Mettre à jour le total
        savedOrder.setTotalAmount(total);
        orderRepository.save(savedOrder);

        // Vider le panier après commande
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
}