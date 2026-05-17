package com.estore.estore_backend.review.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "search_history")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchHistory {
    @Id
    private String id;
    private Long userId;
    private String keyword;
    private LocalDateTime searchedAt;
}
