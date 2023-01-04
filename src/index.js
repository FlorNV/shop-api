const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1", require("./routes/index.routes"));

app.listen(PORT, () => {
  console.log(`🌈 Server running on port ${PORT} 🌈`);
});
