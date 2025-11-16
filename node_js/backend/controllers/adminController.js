const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 const SECRET_KEY = "secret123"; 
 exports.getPendingPublications = (req, res) => {
  db.query("SELECT * FROM publications_attente", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};
exports.acceptPublication = (req, res) => {
  const id = req.params.id;

  const getSql = "SELECT * FROM publications_attente WHERE id = ?";
  db.query(getSql, [id], (err, rows) => {
    if (err) return res.status(500).json(err);
    if (rows.length === 0) return res.status(404).json({ message: "Publication introuvable" });

    const pub = rows[0];

    const insertSql = `
      INSERT INTO produits 
      (id_user, titre, description, categorie, prix, type_annonce, localisation)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertSql, [
      pub.id_user, pub.titre, pub.description, pub.categorie,
      pub.prix, pub.type_annonce, pub.localisation
    ], (err) => {
      if (err) return res.status(500).json(err);

      const deleteSql = "DELETE FROM publications_attente WHERE id = ?";
      db.query(deleteSql, [id]);

      res.json({ message: "Publication acceptée !" });
    });
  });
};
exports.rejectPublication = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM publications_attente WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Publication supprimée" });
  });
};
