package com.estore.estore_backend.shopping.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCartRequest {

    @NotNull
    private Long cartItemId;

    @NotNull
    @Min(value = 1, message = "La quantité doit être au moins 1")
    private Integer quantity;
}