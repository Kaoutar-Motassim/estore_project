package com.estore.estore_backend.config;

import com.estore.estore_backend.catalog.entity.*;
import com.estore.estore_backend.catalog.repository.*;
import com.estore.estore_backend.inventory.entity.Inventory;
import com.estore.estore_backend.inventory.repository.InventoryRepository;
import com.estore.estore_backend.customer.entity.*;
import com.estore.estore_backend.customer.repository.*;
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
        if (categoryRepository.count() > 0) return;

        Category informatique = categoryRepository.save(Category.builder().name("Informatique").description("Ordinateurs et accessoires").build());
        Category telephonie = categoryRepository.save(Category.builder().name("Téléphonie").description("Smartphones et accessoires").build());
        Category audio = categoryRepository.save(Category.builder().name("Audio").description("Casques et enceintes").build());
        Category gaming = categoryRepository.save(Category.builder().name("Gaming").description("Jeux et consoles").build());
        Category maison = categoryRepository.save(Category.builder().name("Maison").description("Mobilier et décoration").build());
        Category mode = categoryRepository.save(Category.builder().name("Mode").description("Vêtements et accessoires").build());

        // Admin user
        User admin = userRepository.save(User.builder()
                .firstName("Admin").lastName("SouqMa").email("admin@souqma.ma")
                .password("admin123").role("ADMIN").build());
        profileRepository.save(Profile.builder().user(admin).phone("0600000000").city("Casablanca").country("Maroc").build());

        // Test seller
        User seller = userRepository.save(User.builder()
                .firstName("Kaoutar").lastName("Motassim").email("test@souqma.ma")
                .password("123456").role("SELLER").build());
        profileRepository.save(Profile.builder().user(seller).phone("0611111111").city("Casablanca").country("Maroc").build());

        // Test buyer
        User buyer = userRepository.save(User.builder()
                .firstName("Meryem").lastName("Mouktader").email("buyer@souqma.ma")
                .password("123456").role("BUYER").build());
        profileRepository.save(Profile.builder().user(buyer).phone("0622222222").city("Rabat").country("Maroc").build());

        // Products
        saveProduct("MacBook Pro M3", "Ordinateur portable Apple puce M3, 16GB RAM, 512GB SSD. Performance exceptionnelle.", 15999.0,
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", "Casablanca", "Neuf", informatique, seller, 10);
        saveProduct("Dell XPS 15", "PC portable Dell OLED 4K, Intel Core i7, 32GB RAM, 1TB SSD.", 12500.0,
                "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400", "Rabat", "Très bon état", informatique, seller, 7);
        saveProduct("Clavier Mécanique RGB", "Clavier gaming Cherry MX Red, rétroéclairage RGB personnalisable.", 899.0,
                "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400", "Fès", "Neuf", informatique, seller, 25);
        saveProduct("iPhone 15 Pro", "Smartphone Apple puce A17 Pro, triple caméra 48MP, écran 6.1 pouces.", 11999.0,
                "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400", "Casablanca", "Neuf", telephonie, seller, 15);
        saveProduct("Samsung Galaxy S24 Ultra", "Android avec S Pen, caméra 200MP, écran 6.8 AMOLED.", 10500.0,
                "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400", "Marrakech", "Neuf", telephonie, seller, 12);
        saveProduct("Sony WH-1000XM5", "Casque sans fil, meilleure réduction de bruit, 30h autonomie.", 2999.0,
                "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400", "Rabat", "Neuf", audio, seller, 18);
        saveProduct("AirPods Pro 2", "Écouteurs Apple réduction de bruit active, son spatial, boîtier MagSafe.", 2499.0,
                "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400", "Casablanca", "Très bon état", audio, seller, 22);
        saveProduct("PlayStation 5", "Console Sony nouvelle génération, SSD ultra-rapide, ray-tracing, 4K/120fps.", 5999.0,
                "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400", "Fès", "Neuf", gaming, seller, 5);
        saveProduct("Xbox Series X", "Console Microsoft 12 téraflops, Game Pass Ultimate inclus.", 5499.0,
                "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400", "Tanger", "Neuf", gaming, seller, 8);

        System.out.println("✅ SouqMa — données de démonstration chargées !");
    }

    private void saveProduct(String name, String desc, double price, String img, String location,
                              String condition, Category cat, User seller, int qty) {
        Product p = productRepository.save(Product.builder()
                .name(name).description(desc).price(price).imageUrl(img)
                .location(location).condition(condition).category(cat).seller(seller).build());
        inventoryRepository.save(Inventory.builder().product(p).quantity(qty).build());
    }
}
