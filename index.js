import path from "path";
import dotenv from "dotenv";
import { dirname } from 'path';
import db from "./config/db.js";
import flash from "connect-flash";
import { fileURLToPath } from 'url';
import pool from "./config/pgPool.js";
import session from "express-session";
import authRoute from "./route/auth.js";
import pgSession from "connect-pg-simple";
import diaryRoute from "./route/diary.js";
import methodOverride from "method-override";
import commentRoute from "./route/comment.js";

dotenv.config();

import express from "express";

const URL = process.env.URL;
const PORT = process.env.PORT;
const store = pgSession(session);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
// start

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(session({
    secret: "nimadir",
    resave: false,
    saveUninitialized: false,
    store: new store({
        pool: pool,
        tableName: "sessions"
    }),
    cookie: { maxAge: 10 * 24 * 60 * 60 * 1000 }
}));
app.use(flash());
app.use((req, res, next) => {
    // auth
    if (req.session.isLogin) {
        res.locals.isLogin = req.session.isLogin;
    } else {
        res.locals.isLogin = false;
    }
    next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/auth", authRoute);
app.use("/diaries", diaryRoute);
app.use("/comments", commentRoute);
app.use("/", (req, res) => {
    res.redirect("/diaries");
});
app.use((req, res) => {
    res.status(404).end("404");
});

//end
const start = async () => {
    try {
        await db.sequelize.sync({ alter: true });
        app.listen(PORT, () => console.log(`${URL}:${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
start();