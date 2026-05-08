package com.estore.estore_backend.customer.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String message;
}