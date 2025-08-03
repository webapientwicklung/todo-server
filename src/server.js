import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7793344",
  password: "WDGhXXjFFC",
  database: "sql7793344",
});

db.connect((err) => {
  if (err) {
    console.error("keine Verbindung! Grund: ", err.message);
  } else {
    console.log("Erfolgreiche Verbindung!");
  }
});
app.get("/", (req, res) => {
  res.send("📝 ToDo-API läuft! Probiere z. B. /todos");
});

app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) res.status(500).json({ error: err });
    res.json(result);
  });
});

app.post("/todos", (req, res) => {
  const { text, isDone, dueDate, onEdit } = req.body;
  db.query(
    "INSERT INTO todos (text, isDone, dueDate, onEdit) VALUES(?,?,?,?)",
    [text, isDone, dueDate, onEdit],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

/* app.listen(3001, () => {
  console.log("Server läuft auf http://localhost:3001");
}); */

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
