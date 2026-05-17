package com.estore.estore_backend.review.repository;

import com.estore.estore_backend.review.document.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByProductId(Long productId);
    List<Review> findTop10ByOrderByCreatedAtDesc();
}
