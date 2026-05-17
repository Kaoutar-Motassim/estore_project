package com.estore.estore_backend.review.repository;

import com.estore.estore_backend.review.document.SearchHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SearchHistoryRepository extends MongoRepository<SearchHistory, String> {
    List<SearchHistory> findByUserIdOrderBySearchedAtDesc(Long userId);
    List<SearchHistory> findTop10ByOrderBySearchedAtDesc();
}
