package com.estore.estore_backend.review.document;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "search_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchHistory {

    @org.springframework.data.annotation.Id
    private String id;

    private Long userId;
    private String keyword;
    private LocalDateTime searchedAt;
}