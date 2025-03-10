const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const db = require("../db/db");

const router = express.Router();

// Configure session
router.use(
    session({
        secret: "86KqaQNAYdR4", // Change this to a strong secret key
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set to true in production with HTTPS
    })
);

// Admin Registration (One-time setup)
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
        `INSERT INTO admin_user (name, email, password) VALUES (?, ?, ?)`,
        [name, email, hashedPassword],
        (err) => {
            if (err) {
                return res.status(400).json({ error: "Admin already exists or invalid data" });
            }
            res.json({ message: "Admin registered successfully!" });
        }
    );
});

// Admin Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM admin_user WHERE email = ?`, [email], async (err, admin) => {
        if (err || !admin) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        req.session.adminId = admin.id;
        res.json({ message: "Login successful", adminId: admin.id });
    });
});

// Check Authentication Status
router.get("/check-auth", (req, res) => {
    if (req.session.adminId) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
});

// Admin Logout
router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out successfully" });
    });
});

module.exports = router;
