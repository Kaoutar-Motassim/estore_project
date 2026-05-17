package com.estore.estore_backend.inventory.service;
// Vérifie le stock disponible, réduit le stock lors d'une commande
import com.estore.estore_backend.inventory.entity.Inventory;
import com.estore.estore_backend.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public boolean isAvailable(Long productId, int quantity) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Stock introuvable"));
        return inventory.getQuantity() >= quantity;
    }

    public void reduceStock(Long productId, int quantity) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Stock introuvable"));

        if (inventory.getQuantity() < quantity) {
            throw new RuntimeException("Stock insuffisant");
        }

        inventory.setQuantity(inventory.getQuantity() - quantity);
        inventoryRepository.save(inventory);
    }

    public Inventory getByProductId(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Stock introuvable"));
    }
}