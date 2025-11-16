const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 const SECRET_KEY = "secret123"; 
exports.register = (req, res) => {
  const { nom, email, mot_de_passe, type_user, telephone, adresse } = req.body;
  const hash = bcrypt.hashSync(mot_de_passe, 10);

  const sql = "INSERT INTO users (nom, email, mot_de_passe, type_user, telephone, adresse) VALUES (?,?,?,?,?,?)";

  db.query(sql, [nom, email, hash, type_user, telephone, adresse], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Inscription réussie !" });
  });
};




exports.login = (req, res) => {
  const { email, mot_de_passe } = req.body;

  // 1️⃣ Vérifier si admin (mot de passe NON hashé)
  db.query("SELECT * FROM admins WHERE email = ?", [email], (err, adminData) => {
    if (err) return res.status(500).json(err);
    
    if (adminData.length > 0) {
      const admin = adminData[0];
 console.log("---- DEBUG ADMIN ----");
      console.log("Admin trouvé email :", admin.email);
      console.log("Admin password DB :", "[" + admin.mot_de_passe + "]");
      console.log("Password envoyé Angular :", "[" + mot_de_passe + "]");
      console.log("----------------------");
      // ❌ PAS DE HASH POUR ADMIN
      if (mot_de_passe !== admin.mot_de_passe) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      return res.json({
        message: "Connexion admin réussie",
        role: "admin",
        user: {
          id: admin.id,
          nom: admin.nom,
          email: admin.email
        }
      });
    }

    // 2️⃣ Vérifier user (hashé)
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, userData) => {
      if (err) return res.status(500).json(err);

      if (userData.length === 0) {
        return res.status(404).json({ message: "Email introuvable" });
      }

      const user = userData[0];

      // ✔ User utilise bcrypt
      if (!bcrypt.compareSync(mot_de_passe, user.mot_de_passe)) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      return res.json({
        message: "Connexion user réussie",
        role: "user",
        user: {
          id: user.id,
          nom: user.nom,
          email: user.email,
          type_user: user.type_user,
          telephone: user.telephone,
          adresse: user.adresse
        }
      });
    });
  });
};



  function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token manquant" });

  const token = authHeader.split(" ")[1]; // Bearer TOKEN
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalide" });
    req.user = decoded; // informations décodées du token
    next();
  });
}

// Fonction profil
exports.profile = (req, res) => {
  // Ici tu peux soit renvoyer un utilisateur statique pour test
  // ou récupérer depuis une session si tu implémentes session
  res.json({
    message: "Profil utilisateur récupéré",
    user: req.user || null // ou une donnée fixe pour test
  });
};
exports.updateProfile = (req, res) => {
  const { id, nom, telephone, adresse } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'ID utilisateur manquant' });
  }

  const sql = 'UPDATE users SET nom = ?, telephone = ?, adresse = ? WHERE id = ?';
  db.query(sql, [nom, telephone, adresse, id], (err, result) => {
    if (err) {
      console.error('Erreur SQL :', err);
      return res.status(500).json({ message: 'Erreur lors de la mise à jour' });
    }

    // Récupère les nouvelles infos mises à jour
    const sql2 = 'SELECT * FROM users WHERE id = ?';
    db.query(sql2, [id], (err2, rows) => {
      if (err2) {
        return res.status(500).json({ message: 'Erreur lors du rechargement' });
      }

      res.json({
        message: 'Profil mis à jour avec succès',
        user: rows[0],
      });
    });
  });
  };
  // Récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
  const sql = "SELECT id, nom, email, type_user, telephone, adresse, role, date_creation FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(data);
  });
};

// Supprimer utilisateur
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [userId], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Utilisateur supprimé" });
  });
};
// controllers/produitController.js

exports.addPublication = (req, res) => {
  const { id_user, titre, description, categorie, prix, type_annonce, localisation } = req.body;

  const sql = `INSERT INTO publications_attente
    (id_user, titre, description, categorie, prix, type_annonce, localisation)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [id_user, titre, description, categorie, prix, type_annonce, localisation], (err) => {
    if (err) return res.status(500).json({ message: err.message });

    res.json({ message: "Publication envoyée pour vérification" });
  });
};
// Récupérer tous les produits d’un utilisateur
exports.getProductsByUser = (req, res) => {
  const { id_user } = req.params;

  const sql = `
    SELECT p.*, u.nom as user_nom, u.telephone as user_telephone, u.adresse as user_adresse
    FROM produits p
    JOIN users u ON p.id_user = u.id
    WHERE p.id_user = ?
  `;

  db.query(sql, [id_user], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

exports.getProducts = (req, res) => {
  const sql = `
    SELECT p.*, u.nom as user_nom, u.telephone as user_telephone, u.adresse as user_adresse
    FROM produits p
    JOIN users u ON p.id_user = u.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

exports.getProductsByType = (req, res) => {
  const { type } = req.params; // 'vente', 'don', 'echange'

  const sql = `
    SELECT p.*, u.nom as user_nom, u.telephone as user_telephone, u.adresse as user_adresse
    FROM produits p
    JOIN users u ON p.id_user = u.id
    WHERE p.type_annonce = ? AND p.statut = 'actif'
  `;

  db.query(sql, [type], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};
exports.getProductById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT p.*, u.nom AS user_nom, u.telephone AS user_telephone, u.adresse AS user_adresse
    FROM produits p
    JOIN users u ON p.id_user = u.id
    WHERE p.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    res.json(results[0]); // un seul produit
  });
};
// Supprimer une publication
exports.deletePublication = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM produits WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Publication supprimée avec succès" });
  });
};

// Modifier une publication
exports.updatePublication = (req, res) => {
  const { id, titre, description, prix, categorie, type_annonce, localisation } = req.body;

  const sql = `
    UPDATE produits 
    SET titre = ?, description = ?, prix = ?, categorie = ?, type_annonce = ?, localisation = ? 
    WHERE id = ?
  `;

  db.query(sql, [titre, description, prix, categorie, type_annonce, localisation, id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Publication mise à jour avec succès" });
  });
};







