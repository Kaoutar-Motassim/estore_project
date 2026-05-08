package com.estore.estore_backend.billing.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequest {

    @NotNull(message = "L'utilisateur est obligatoire")
    private Long userId;
}