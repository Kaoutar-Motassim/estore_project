package com.estore.estore_backend.shopping.service;
// Crée le panier, ajoute/supprime des articles
import com.estore.estore_backend.catalog.entity.Product;
import com.estore.estore_backend.catalog.repository.ProductRepository;
import com.estore.estore_backend.customer.entity.User;
import com.estore.estore_backend.customer.repository.UserRepository;
import com.estore.estore_backend.inventory.service.InventoryService;
import com.estore.estore_backend.shopping.dto.*;
import com.estore.estore_backend.shopping.entity.*;
import com.estore.estore_backend.shopping.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final InventoryService inventoryService;

    public Cart getCartByUserId(Long userId) {
        List<Cart> carts = cartRepository.findByUserId (userId);
        if (!carts.isEmpty()) {
            return carts.get(0); // retourne le premier panier
        }
        return createCart(userId);
    }

    private Cart createCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        Cart cart = Cart.builder()
                .user(user)
                .createdAt(LocalDateTime.now())
                .items(new ArrayList<>())
                .build();

        return cartRepository.save(cart);
    }

    public Cart addToCart(AddToCartRequest request) {
        if (!inventoryService.isAvailable(request.getProductId(), request.getQuantity())) {
            throw new RuntimeException("Stock insuffisant");
        }

        Cart cart = getCartByUserId(request.getUserId());

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        // Vérifier si le produit est déjà dans le panier
        for (CartItem item : cart.getItems()) {
            if (item.getProduct().getId().equals(request.getProductId())) {
                item.setQuantity(item.getQuantity() + request.getQuantity());
                cartItemRepository.save(item);
                return cartRepository.save(cart);
            }
        }

        CartItem newItem = CartItem.builder()
                .cart(cart)
                .product(product)
                .quantity(request.getQuantity())
                .unitPrice(product.getPrice())
                .build();

        cart.getItems().add(newItem);
        return cartRepository.save(cart);
    }

    public Cart updateCartItem(UpdateCartRequest request) {
        CartItem item = cartItemRepository.findById(request.getCartItemId())
                .orElseThrow(() -> new RuntimeException("Article introuvable"));

        item.setQuantity(request.getQuantity());
        cartItemRepository.save(item);

        return cartRepository.findById(item.getCart().getId()).get();
    }

    public void removeCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
}