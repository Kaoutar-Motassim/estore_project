package com.estore.estore_backend.catalog.service;

import com.estore.estore_backend.catalog.dto.CreateListingRequest;
import com.estore.estore_backend.catalog.entity.*;
import com.estore.estore_backend.catalog.repository.*;
import com.estore.estore_backend.customer.entity.User;
import com.estore.estore_backend.customer.repository.UserRepository;
import com.estore.estore_backend.inventory.entity.Inventory;
import com.estore.estore_backend.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final InventoryRepository inventoryRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> getProductsBySeller(Long sellerId) {
        return productRepository.findBySellerId(sellerId);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product createListing(CreateListingRequest req) {
        Category category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Categorie introuvable"));

        User seller = userRepository.findById(req.getSellerId())
                .orElseThrow(() -> new RuntimeException("Vendeur introuvable"));

        // Make sure user is a seller
        if (!"SELLER".equals(seller.getRole()) && !"ADMIN".equals(seller.getRole())) {
            seller.setRole("SELLER");
            userRepository.save(seller);
        }

        Product product = Product.builder()
                .name(req.getName())
                .description(req.getDescription())
                .price(req.getPrice())
                .imageUrl(req.getImageUrl())
                .location(req.getLocation())
                .condition(req.getCondition() != null ? req.getCondition() : "Neuf")
                .category(category)
                .seller(seller)
                .build();

        Product saved = productRepository.save(product);

        int qty = req.getQuantity() != null ? req.getQuantity() : 1;
        inventoryRepository.save(Inventory.builder().product(saved).quantity(qty).build());

        return saved;
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
