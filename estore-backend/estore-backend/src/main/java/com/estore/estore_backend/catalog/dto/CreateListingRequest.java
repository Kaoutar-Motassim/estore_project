package com.estore.estore_backend.catalog.dto;

import lombok.Data;

@Data
public class CreateListingRequest {
    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private String location;
    private String condition;
    private Long categoryId;
    private Long sellerId;
    private Integer quantity;
}
