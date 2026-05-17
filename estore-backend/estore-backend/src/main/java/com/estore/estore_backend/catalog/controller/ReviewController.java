package com.estore.estore_backend.catalog.controller;

import com.estore.estore_backend.review.document.Review;
import com.estore.estore_backend.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;

    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewRepository.findTop10ByOrderByCreatedAtDesc());
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewRepository.findByProductId(productId));
    }

    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        return ResponseEntity.status(201).body(reviewRepository.save(review));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable String id) {
        reviewRepository.deleteById(id);
        return ResponseEntity.ok("Avis supprime");
    }
}
