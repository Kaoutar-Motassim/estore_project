package com.estore.estore_backend.catalog.controller;

import com.estore.estore_backend.catalog.dto.CreateListingRequest;
import com.estore.estore_backend.catalog.entity.*;
import com.estore.estore_backend.catalog.service.ProductService;
import com.estore.estore_backend.review.document.SearchHistory;
import com.estore.estore_backend.review.repository.SearchHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final SearchHistoryRepository searchHistoryRepository;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long categoryId) {
        if (search != null && !search.isBlank()) {
            List<Product> results = productService.searchProducts(search);
            searchHistoryRepository.save(SearchHistory.builder().keyword(search).searchedAt(LocalDateTime.now()).build());
            return ResponseEntity.ok(results);
        }
        if (categoryId != null) {
            return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
        }
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(productService.getAllCategories());
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.status(201).body(productService.createProduct(product));
    }

    // New: create a listing with seller info
    @PostMapping("/listings")
    public ResponseEntity<Product> createListing(@RequestBody CreateListingRequest req) {
        return ResponseEntity.status(201).body(productService.createListing(req));
    }

    // New: get products by seller
    @GetMapping("/products/seller/{sellerId}")
    public ResponseEntity<List<Product>> getProductsBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(productService.getProductsBySeller(sellerId));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Produit supprimé");
    }

    @GetMapping("/search/history")
    public ResponseEntity<List<SearchHistory>> getSearchHistory() {
        return ResponseEntity.ok(searchHistoryRepository.findTop10ByOrderBySearchedAtDesc());
    }
}
