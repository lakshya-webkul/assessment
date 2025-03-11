const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS admin_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
  )`,
  (err) => {
    if (err) console.error("Error creating admin_user table:", err.message);
    else console.log("Admin table is ready.");
  }
);

db.run(
  `CREATE TABLE IF NOT EXISTS gadgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL
  )`,
  (err) => {
    if (err) console.error("Error creating gadgets table:", err.message);
    else console.log("Gadgets table is ready.");
  }
);

module.exports = db;
