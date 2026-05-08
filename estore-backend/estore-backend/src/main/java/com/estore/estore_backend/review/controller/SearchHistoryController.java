package com.estore.estore_backend.review.controller;

import com.estore.estore_backend.review.document.SearchHistory;
import com.estore.estore_backend.review.service.SearchHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/search-history")
@RequiredArgsConstructor
public class SearchHistoryController {

    private final SearchHistoryService searchHistoryService;

    @PostMapping
    public ResponseEntity<?> saveSearch(
            @RequestParam Long userId,
            @RequestParam String keyword) {
        searchHistoryService.saveSearch(userId, keyword);
        return ResponseEntity.ok("Recherche sauvegardée");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SearchHistory>> getHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(searchHistoryService.getHistoryByUser(userId));
    }
}