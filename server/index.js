const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const db = require("./db/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET || "86KqaQNAYdR4",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

const authRoutes = require("./routes/auth");
const gadgetRoutes = require("./routes/gadgets");

app.use("/auth", authRoutes);
app.use("/gadgets", gadgetRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
