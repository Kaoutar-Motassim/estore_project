# 🛍️ EStore — Plateforme E-Commerce Full Stack

Application e-commerce complète développée dans le cadre du module Full Stack.

**Étudiant :** Kaoutar Motassim  
**Encadrant :** Pr. Omar Zahour  
**Faculté des Sciences Ben M'Sick — Université Hassan II de Casablanca**

---

## 🏗️ Architecture

```
EStore
├── estore-backend/     → Spring Boot 4.0.6 + JPA + MongoDB
└── estore-frontend/    → React 18 + TypeScript + Vite
```

### Technologies utilisées
| Couche | Technologie |
|--------|-------------|
| Backend | Spring Boot 4.0.6, Java 17 |
| Base relationnelle | MySQL 8.0 + Spring Data JPA |
| Base documentaire | MongoDB + Spring Data MongoDB |
| Frontend | React 18, TypeScript, Vite |
| HTTP Client | Axios |

---

## ⚙️ Prérequis

- Java 17+
- Maven 3.8+
- MySQL 8.0
- MongoDB 6+
- Node.js 18+
- npm 9+

---

## 🚀 Lancement du Backend

### 1. Configurer MySQL

```bash
# Ouvrir MySQL
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
.\mysql -u root -proot123

# La base sera créée automatiquement au démarrage
```

### 2. Démarrer MongoDB

```bash
# Windows
net start MongoDB
```

### 3. Configurer `application.properties`

```properties
# MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/estore_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root123

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/estore_mongo
spring.data.mongodb.database=estore_mongo

# Server
server.port=8080
```

### 4. Lancer le backend

```bash
cd estore-backend
./mvnw spring-boot:run
```

Le backend démarre sur **http://localhost:8080**

Les données de démonstration sont chargées automatiquement (12 produits, 4 catégories).

---

## 💻 Lancement du Frontend

```bash
cd estore-frontend
npm install
npm run dev
```

Le frontend démarre sur **http://localhost:5173**

---

## 👤 Compte de test

| Champ | Valeur |
|-------|--------|
| Email | test@estore.com |
| Mot de passe | 123456 |

---

## 📡 API REST

### Authentification
| Méthode | URL | Description |
|---------|-----|-------------|
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/login` | Connexion |
| GET | `/api/users/{id}` | Profil utilisateur |
| PUT | `/api/users/{id}/profile` | Modifier profil |

### Catalogue
| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/products` | Liste des produits |
| GET | `/api/products/{id}` | Détail produit |
| GET | `/api/categories` | Liste des catégories |

### Panier
| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/cart/{userId}` | Panier utilisateur |
| POST | `/api/cart/add` | Ajouter au panier |
| PUT | `/api/cart/update` | Modifier quantité |
| DELETE | `/api/cart/remove/{itemId}` | Supprimer article |

### Commandes
| Méthode | URL | Description |
|---------|-----|-------------|
| POST | `/api/orders` | Passer commande |
| GET | `/api/orders/user/{userId}` | Historique commandes |

### MongoDB
| Méthode | URL | Description |
|---------|-----|-------------|
| POST | `/api/reviews` | Créer un avis |
| GET | `/api/reviews/product/{id}` | Avis d'un produit |
| POST | `/api/search-history` | Sauvegarder recherche |
| GET | `/api/search-history/user/{id}` | Historique recherches |

---

## 🗂️ Structure du Backend

```
src/main/java/com/estore/estore_backend/
├── billing/          → Commandes (Order, OrderItem)
├── catalog/          → Produits et catégories
├── config/           → Configuration CORS, MongoDB, DataLoader
├── customer/         → Utilisateurs et profils
├── inventory/        → Gestion des stocks
├── review/           → Avis et historique (MongoDB)
└── shopping/         → Panier (Cart, CartItem)
```

---

## 🗂️ Structure du Frontend

```
src/
├── api/              → Services HTTP (axios)
├── components/       → Navbar
├── context/          → AuthContext
├── pages/
│   ├── auth/         → Login, Register
│   ├── catalog/      → Catalogue, Fiche produit
│   ├── cart/         → Panier
│   ├── orders/       → Commandes
│   └── profile/      → Profil
└── types/            → Types TypeScript
```

---

## ✅ Fonctionnalités implémentées

- [x] Inscription et connexion
- [x] Catalogue avec recherche et filtres par catégorie
- [x] Fiche détail produit
- [x] Gestion du panier (ajout, suppression, quantité)
- [x] Validation de commande avec mise à jour du stock
- [x] Historique des commandes
- [x] Avis produits (MongoDB)
- [x] Historique de recherche (MongoDB)
- [x] Modification du profil utilisateur
