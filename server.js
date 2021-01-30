const path = require("path");
const express = require("express");
const config = require("config");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/gallery", require("./routes/gallery"));

const PORT = config.get("PORT") || 5000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}...`);
});
