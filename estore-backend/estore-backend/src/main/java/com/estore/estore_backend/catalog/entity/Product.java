package com.estore.estore_backend.catalog.entity;

import com.estore.estore_backend.customer.entity.User;
import com.estore.estore_backend.inventory.entity.Inventory;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private Double price;

    private String imageUrl;

    private String location;

    @Column(nullable = false)
    @Builder.Default
    private String condition = "Neuf"; // Neuf, Très bon état, Bon état, Acceptable

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
    private Inventory inventory;
}
