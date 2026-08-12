import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { inputCleaner, inputValidator } from "./middleware.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/form");
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit", inputCleaner, inputValidator, (req, res) => {
  res.json({
    username: req.body.username,
    comment: req.body.comment,
  });
});

app.listen(3000, () => {
  console.log("Data sanitizer server listening on port 3000...");
});