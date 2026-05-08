package com.estore.estore_backend.review.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {

    @NotNull
    private Long productId;

    @NotNull
    private Long userId;

    @NotBlank
    private String authorName;

    @NotNull
    @Min(1) @Max(5)
    private Integer rating;

    @NotBlank
    private String comment;
}