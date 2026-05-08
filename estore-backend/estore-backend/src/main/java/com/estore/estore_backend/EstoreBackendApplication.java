package com.estore.estore_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(
		basePackages = "com.estore.estore_backend.review.repository"
)
@EnableJpaRepositories(basePackages = {
		"com.estore.estore_backend.customer.repository",
		"com.estore.estore_backend.catalog.repository",
		"com.estore.estore_backend.inventory.repository",
		"com.estore.estore_backend.shopping.repository",
		"com.estore.estore_backend.billing.repository"
})
public class EstoreBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(EstoreBackendApplication.class, args);
	}
}