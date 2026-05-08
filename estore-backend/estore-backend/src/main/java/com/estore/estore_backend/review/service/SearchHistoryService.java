package com.estore.estore_backend.review.service;

import com.estore.estore_backend.review.document.SearchHistory;
import com.estore.estore_backend.review.repository.SearchHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchHistoryService {

    private final SearchHistoryRepository searchHistoryRepository;

    public void saveSearch(Long userId, String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) return;

        SearchHistory history = SearchHistory.builder()
                .userId(userId)
                .keyword(keyword.trim())
                .searchedAt(LocalDateTime.now())
                .build();

        searchHistoryRepository.save(history);
    }

    public List<SearchHistory> getHistoryByUser(Long userId) {
        return searchHistoryRepository.findByUserIdOrderBySearchedAtDesc(userId);
    }
}