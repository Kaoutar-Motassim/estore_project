package com.estore.estore_backend.review.document;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @org.springframework.data.annotation.Id
    private String id;

    private Long productId;
    private Long userId;
    private String authorName;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
}