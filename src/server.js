import express from "express";
import pool from "./db.js";

const app = express();
app.use(express.json());

app.get("/", async function (req, res) {
  const { rows } = await pool.query("SELECT * FROM resources");
  res.json(rows);
});

app.listen(3000, () => {
  console.log("🚀 Serveur lancé : http://localhost:3000");
});
// ======= SKILLS =======

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

app.post("/skills", async function (req, res) {
  const { name } = req.body;

  const { rows } = await pool.query(
    "INSERT INTO skills (name) VALUES ( $1 ) RETURNING *",
    [name],
  );
  res.status(201).json(rows[0]);
});

app.put("/skills/:id", async (req, res) => {
  const { name } = req.body;
  const { rows } = await pool.query(
    "UPDATE skills SET name = $1 WHERE id = $2 RETURNING *",
    [name, req.params.id],
  );
  res.json(rows[0]);
});

app.delete("/skills/:id", async (req, res) => {
  await pool.query("DELETE FROM skills WHERE id = $1", [req.params.id]);
  res.json({ message: "Delete a skill" });
});

// ======= THEMES =======
app.get("/themes/", async function (req, res) {
  const { rows } = await pool.query("SELECT * from themes");
  res.json(rows);
});

app.get("/themes/:id", async function (req, res) {
  const { rows } = await pool.query("SELECT * from themes WHERE id= $1", [
    req.params.id,
  ]);
  res.json(rows);
});

app.post("/themes", async (req, res) => {
  const { name, description } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO themes (name, description) VALUES ($1, $2) RETURNING *",
    [name, description],
  );
  res.status(201).json(rows[0]);
});

app.put("/themes/:id", async (req, res) => {
  const { name, description } = req.body; // ✅ description ajoutée
  const { rows } = await pool.query(
    "UPDATE themes SET name = $1, description = $2 WHERE id = $3 RETURNING *",
    [name, description, req.params.id],
  );
  res.json(rows[0]);
});

app.delete("/themes/:id", async (req, res) => {
  await pool.query("DELETE FROM themes WHERE id = $1", [req.params.id]);
  res.json({ message: "Delete a themes" });
});

// ======= RESOURCES =======

app.get("/resources/", async function (req, res) {
  const { rows } = await pool.query("SELECT * from resources");
  res.json(rows);
});

app.get("/resources/:id", async function (req, res) {
  const { rows } = await pool.query("SELECT * from resources WHERE id= $1", [
    req.params.id,
  ]);
  res.json(rows);
});

app.post("/resources", async (req, res) => {
  const { type, title, description, url, is_ada, theme_id } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO resources (type, title, description, url, is_ada, theme_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [type, title, description, url, is_ada, theme_id],
  );
  res.status(201).json(rows[0]);
});

app.put("/resources/:id", async (req, res) => {
  const { type, title, description, url, is_ada, theme_id } = req.body; // ✅ toutes les colonnes
  const { rows } = await pool.query(
    "UPDATE resources SET type = $1, title = $2, description = $3, url = $4, is_ada = $5, theme_id = $6 WHERE id = $7 RETURNING *",
    [type, title, description, url, is_ada, theme_id, req.params.id],
  );
  res.json(rows[0]);
});

app.delete("/resources/:id", async (req, res) => {
  await pool.query("DELETE FROM resources WHERE id = $1", [req.params.id]);
  res.json({ message: "Delete a resources" });
});

// ======= RESOURCES_SKILLS =======

app.get("/resources_skills/", async function (req, res) {
  const { rows } = await pool.query("SELECT * from resources_skills");
  res.json(rows);
});

app.get("/resources_skills/skill/:skill_id", async function (req, res) {
  const { skill_id } = req.params;

  const { rows } = await pool.query(
    "SELECT * FROM resources_skills WHERE skill_id = $1",
    [skill_id],
  );

  res.json(rows);
});

app.get("/resources_skills/resources/:resources_id", async function (req, res) {
  const { resources_id } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM resources_skills WHERE resources_id = $1",
    [resources_id],
  );
  res.json(rows);
});

app.post("/resources_skills", async (req, res) => {
  const { resources_id, skill_id } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO resources_skills (resources_id, skill_id) VALUES ($1, $2) RETURNING *",
    [resources_id, skill_id],
  );
  res.status(201).json(rows[0]);
});

app.delete("/resources_skills/:skill_id/:resources_id", async (req, res) => {
  await pool.query(
    "DELETE FROM resources_skills WHERE skill_id = $1 AND resources_id = $2",
    [req.params.skill_id, req.params.resources_id],
  );
  res.json({ message: "Delete a link" });
});
