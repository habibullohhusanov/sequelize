import dotenv from "dotenv";
import db from "./config/db.js";
import diaryRoute from "./route/diary.js"
import commentRoute from "./route/comment.js"
import methodOverride from "method-override";

dotenv.config();

import express from "express";

const URL = process.env.URL;
const PORT = process.env.PORT;

const app = express();
// start

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");


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