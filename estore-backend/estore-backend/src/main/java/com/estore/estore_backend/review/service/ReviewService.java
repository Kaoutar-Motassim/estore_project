package com.estore.estore_backend.review.service;
// Logique de création et récupération des avis
import com.estore.estore_backend.review.document.Review;
import com.estore.estore_backend.review.dto.ReviewRequest;
import com.estore.estore_backend.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public Review createReview(ReviewRequest request) {
        Review review = Review.builder()
                .productId(request.getProductId())
                .userId(request.getUserId())
                .authorName(request.getAuthorName())
                .rating(request.getRating())
                .comment(request.getComment())
                .createdAt(LocalDateTime.now())
                .build();

        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }
}