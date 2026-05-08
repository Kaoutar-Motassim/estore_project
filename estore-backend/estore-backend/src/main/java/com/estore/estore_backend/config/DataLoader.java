package com.estore.estore_backend.config;

import com.estore.estore_backend.catalog.entity.Category;
import com.estore.estore_backend.catalog.entity.Product;
import com.estore.estore_backend.catalog.repository.CategoryRepository;
import com.estore.estore_backend.catalog.repository.ProductRepository;
import com.estore.estore_backend.inventory.entity.Inventory;
import com.estore.estore_backend.inventory.repository.InventoryRepository;
import com.estore.estore_backend.customer.entity.User;
import com.estore.estore_backend.customer.entity.Profile;
import com.estore.estore_backend.customer.repository.UserRepository;
import com.estore.estore_backend.customer.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    @Override
    public void run(String... args) throws Exception {

        // Ne pas recharger si déjà fait
        if (categoryRepository.count() > 0) return;

        // ===== CATEGORIES =====
        Category informatique = categoryRepository.save(
                Category.builder().name("Informatique").description("Ordinateurs et accessoires").build()
        );
        Category telephonie = categoryRepository.save(
                Category.builder().name("Téléphonie").description("Smartphones et accessoires").build()
        );
        Category audio = categoryRepository.save(
                Category.builder().name("Audio").description("Casques et enceintes").build()
        );
        Category gaming = categoryRepository.save(
                Category.builder().name("Gaming").description("Jeux et consoles").build()
        );

        // ===== PRODUITS INFORMATIQUE =====
        Product p1 = productRepository.save(Product.builder()
                .name("MacBook Pro M3")
                .description("Ordinateur portable Apple avec puce M3, 16GB RAM, 512GB SSD. Performance exceptionnelle pour les professionnels.")
                .price(15999.0)
                .imageUrl("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400")
                .category(informatique)
                .build());
        inventoryRepository.save(Inventory.builder().product(p1).quantity(10).build());

        Product p2 = productRepository.save(Product.builder()
                .name("Dell XPS 15")
                .description("PC portable Dell avec écran OLED 4K, Intel Core i7, 32GB RAM, 1TB SSD.")
                .price(12500.0)
                .imageUrl("https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400")
                .category(informatique)
                .build());
        inventoryRepository.save(Inventory.builder().product(p2).quantity(7).build());

        Product p3 = productRepository.save(Product.builder()
                .name("Clavier Mécanique RGB")
                .description("Clavier mécanique gaming avec switches Cherry MX Red, rétroéclairage RGB personnalisable.")
                .price(899.0)
                .imageUrl("https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400")
                .category(informatique)
                .build());
        inventoryRepository.save(Inventory.builder().product(p3).quantity(25).build());

        Product p4 = productRepository.save(Product.builder()
                .name("Souris Logitech MX Master 3")
                .description("Souris sans fil ergonomique avec molette électromagnétique, compatible multi-appareils.")
                .price(650.0)
                .imageUrl("https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400")
                .category(informatique)
                .build());
        inventoryRepository.save(Inventory.builder().product(p4).quantity(30).build());

        // ===== PRODUITS TELEPHONIE =====
        Product p5 = productRepository.save(Product.builder()
                .name("iPhone 15 Pro")
                .description("Smartphone Apple avec puce A17 Pro, triple caméra 48MP, écran Super Retina XDR 6.1 pouces.")
                .price(11999.0)
                .imageUrl("https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400")
                .category(telephonie)
                .build());
        inventoryRepository.save(Inventory.builder().product(p5).quantity(15).build());

        Product p6 = productRepository.save(Product.builder()
                .name("Samsung Galaxy S24 Ultra")
                .description("Le meilleur Android avec S Pen intégré, caméra 200MP, écran 6.8 pouces AMOLED.")
                .price(10500.0)
                .imageUrl("https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400")
                .category(telephonie)
                .build());
        inventoryRepository.save(Inventory.builder().product(p6).quantity(12).build());

        Product p7 = productRepository.save(Product.builder()
                .name("Xiaomi 14 Pro")
                .description("Smartphone haut de gamme avec caméra Leica, charge rapide 120W, Snapdragon 8 Gen 3.")
                .price(7200.0)
                .imageUrl("https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400")
                .category(telephonie)
                .build());
        inventoryRepository.save(Inventory.builder().product(p7).quantity(20).build());

        // ===== PRODUITS AUDIO =====
        Product p8 = productRepository.save(Product.builder()
                .name("Sony WH-1000XM5")
                .description("Casque sans fil avec la meilleure réduction de bruit du marché, 30h d'autonomie.")
                .price(2999.0)
                .imageUrl("https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400")
                .category(audio)
                .build());
        inventoryRepository.save(Inventory.builder().product(p8).quantity(18).build());

        Product p9 = productRepository.save(Product.builder()
                .name("AirPods Pro 2")
                .description("Écouteurs Apple avec réduction de bruit active, son spatial, boîtier MagSafe.")
                .price(2499.0)
                .imageUrl("https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400")
                .category(audio)
                .build());
        inventoryRepository.save(Inventory.builder().product(p9).quantity(22).build());

        Product p10 = productRepository.save(Product.builder()
                .name("JBL Charge 5")
                .description("Enceinte Bluetooth portable waterproof avec 20h d'autonomie et fonction Power Bank.")
                .price(1299.0)
                .imageUrl("https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400")
                .category(audio)
                .build());
        inventoryRepository.save(Inventory.builder().product(p10).quantity(35).build());

        // ===== PRODUITS GAMING =====
        Product p11 = productRepository.save(Product.builder()
                .name("PlayStation 5")
                .description("Console Sony nouvelle génération avec SSD ultra-rapide, ray-tracing, 4K/120fps.")
                .price(5999.0)
                .imageUrl("https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400")
                .category(gaming)
                .build());
        inventoryRepository.save(Inventory.builder().product(p11).quantity(5).build());

        Product p12 = productRepository.save(Product.builder()
                .name("Xbox Series X")
                .description("Console Microsoft avec 12 téraflops de puissance, Game Pass Ultimate inclus.")
                .price(5499.0)
                .imageUrl("https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400")
                .category(gaming)
                .build());
        inventoryRepository.save(Inventory.builder().product(p12).quantity(8).build());

        // ===== UTILISATEUR TEST =====
        if (userRepository.count() == 0) {
            User user = userRepository.save(User.builder()
                    .firstName("Kaoutar")
                    .lastName("Test")
                    .email("test@estore.com")
                    .password("123456")
                    .build());
            profileRepository.save(Profile.builder()
                    .user(user)
                    .phone("0600000000")
                    .city("Casablanca")
                    .country("Maroc")
                    .build());
        }

        System.out.println("✅ Données de démonstration chargées !");
    }
}