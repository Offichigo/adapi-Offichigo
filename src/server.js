import express from "express";
import pool from "./db.js";

const app = express();

app.get("/", async function (req, res) {
  const { rows } = await pool.query("SELECT * FROM resources");
  res.json(rows);
});

app.listen(3000, () => {
  console.log("🚀 Serveur lancé : http://localhost:3000");
});

app.get("/skills/", async function (req, res) {
  const { rows } = await pool.query("SELECT * from skills");
  res.json(rows);
});

app.get("/skills/:id", async function (req, res) {
  const { rows } = await pool.query("SELECT * from skills WHERE id= $1", [
    req.params.id,
  ]);
  res.json(rows);
});

app.get("/themes/", async function (req, res) {
  const { rows } = await pool.query("SELECT * from themes");
  res.json(rows);
});

app.get("/resources/", async function (req, res) {
  const { rows } = await pool.query("SELECT * from resources");
  res.json(rows);
});

app.get("/resources_skills/", async function (req, res) {
  const { rows } = await pool.query("SELECT * from resources_skills");
  res.json(rows);
});
