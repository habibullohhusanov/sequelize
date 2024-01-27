import dotenv from "dotenv";
import db from "./config/db.js";
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

const app = express();
// start

app.use(express.urlencoded({extended: true}));
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
    cookie: { maxAge: 15 * 24 * 60 * 60 * 1000 }
}));


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
    } catch(e) {
        console.log(e);
    }
}
start();