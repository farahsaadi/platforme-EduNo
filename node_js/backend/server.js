const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", require("./routes/authRoutes"));


app.listen(3000, () => {
  console.log("✅ Serveur Node.js démarré sur http://localhost:3000");
});

