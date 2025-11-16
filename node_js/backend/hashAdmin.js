const bcrypt = require('bcrypt');

// Mot de passe que tu veux pour ton admin
const password = "admin123";

// Génération du hash
const hash = bcrypt.hashSync(password, 10);

console.log("Mot de passe en clair :", password);
console.log("Hash généré :", hash);
