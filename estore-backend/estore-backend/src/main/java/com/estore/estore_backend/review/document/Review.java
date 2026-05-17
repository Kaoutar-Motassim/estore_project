package com.estore.estore_backend.review.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "reviews")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    private String id;
    private Long productId;
    private Long userId;
    private String authorName;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;
}
