const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db/db");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO admin_user (name, email, password) VALUES (?, ?, ?)`,
            [name, email, hashedPassword],
            function (err) {
                if (err) {
                    return res.status(400).json({ error: "Admin already exists or invalid data" });
                }
                res.json({ message: "Admin registered successfully!", adminId: this.lastID });
            }
        );
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

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

router.get("/check-auth", (req, res) => {
    if (req.session && req.session.adminId) {
        res.json({ authenticated: true, adminId: req.session.adminId });
    } else {
        res.json({ authenticated: false });
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Logout failed" });
        }
        res.json({ message: "Logged out successfully" });
    });
});

module.exports = router;
