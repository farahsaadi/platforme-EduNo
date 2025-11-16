const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");


// Inscription
router.post("/register", authController.register);

// Connexion
router.post("/login", authController.login);

// Profil
router.get("/profile", authController.profile);

// ✅ Mise à jour du profil
router.put("/update-profile", authController.updateProfile);
router.get("/all-users", authController.getAllUsers);
router.delete("/delete-user/:id", authController.deleteUser);
//produit
router.post("/add-publication", authController.addPublication);
router.get("/pending", adminController.getPendingPublications);
router.put("/accept/:id", adminController.acceptPublication);
router.delete("/reject/:id",adminController.rejectPublication);
router.get("/produits",  authController.getProducts);

// Récupérer les produits d’un utilisateur spécifique
router.get("/user/:id_user",  authController.getProductsByUser);

// Récupérer les produits par type d’annonce
router.get("/type/:type",  authController.getProductsByType);
router.get("/product/:id", authController.getProductById);
//
router.delete("/publication/:id", authController.deletePublication);
router.put("/publication/:id", authController.updatePublication);


module.exports = router;
