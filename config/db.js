import dotenv from "dotenv";
dotenv.config();

import Sequelize from "sequelize";

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const connection = process.env.DB_CONNECTION;

var sequelize = null;

if (!database || !password || !port || !username || !host) {
    console.log("Fill in the database information");
} else {
    sequelize = new Sequelize(database, username, password, {
        host: host,
        port: port,
        dialect: connection,
    });
}

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models

import user from "../models/user.js"
import diary from "../models/diary.js";
import comment from "../models/comment.js";
import session from "../models/session.js";

// create models

db.user = user(sequelize, Sequelize);
db.diary = diary(sequelize, Sequelize);
db.comment = comment(sequelize, Sequelize);
db.session = session(sequelize, Sequelize);

/*    reletions    */
// has many
db.user.hasMany(db.diary, {
    as: "diaries",
    onDelete: "CASCADE",
    constraints: true
})
db.diary.hasMany(db.comment, {
    as: "comments",
    onDelete: "CASCADE",
    constraints: true
});
// belongs to
db.diary.belongsTo(db.user, {
    foregnKey: "userId",
    as: "user",
});
db.comment.belongsTo(db.diary, {
    foregnKey: "diaryId",
    as: "diary",
});
// belongsto many


export default db;


/*
import dotenv from "dotenv";
dotenv.config();

import Sequelize from "sequelize";

const db = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const connection = process.env.DB_CONNECTION;

var sequelize = null;

if (!db || !password || !port || !username || !host) {
    console.log("Fill in the database information");
} else {
    sequelize = new Sequelize(db, username, password, {
        host: host,
        port: port,
        dialect: connection,
    });
}

export default sequelize;
*/