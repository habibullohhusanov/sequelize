import db from "../config/db.js";

const Diary = db.diary;
const Comments = db.comment;

export const index = async (req, res) => {
    try {
        const diaries = await Diary.findAll({raw: true});
        res.render("diaries/index", {
            diaries: diaries,
        });
    } catch (e) {
        res.render("error_pages/error", {
            error: e
        });
    }
}
export const create = async (req, res) => {
    try {
        res.render("diaries/add", {
            "title": "User add",
        });
    } catch(e) {
        res.render("error_pages/error", {
            error: e
        });
    }
}
export const store = async (req, res) => {
    try {
        const {text} = req.body;
        if (req.file) {
            await Diary.create({
                imageUrl: "/images/" + req.file.filename,
                text: text,
                userId: req.session.user.id,
            });
        }
        return res.redirect("/diaries");
    } catch(e) {
        return res.render("error_pages/error", {
            error: e
        });
    }
}
export const view = async (req, res) => {
    try {
        const diary = await Diary.findByPk(req.params.id, {
            include: ["comments"]
        });
        res.render("diaries/lenta", {
            diary: diary,
            comments: diary.comments
        });
    } catch(e) {
        res.render("error_pages/error", {
            error: e
        });
    }
}
export const edit = async (req, res) => {
    try {
        const diary = await Diary.findByPk({where: {
            id: req.params.id
        }});
        res.render("diaries/edit", {
            diary: diary,
        });
    } catch(e) {
        res.render("error_pages/error", {
            error: e
        });
    }
}
export const update = async (req, res) => {
    try {
        const {image, text} = req.body;
        const diary = await Diary.findByPk({where: {
            id: req.params.id
        }});
        await Diary.update({
            text: text,
            imageUrl: image
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect("/diaries");
    } catch(e) {
        res.render("error_pages/error", {
            error: e
        });
    }
}
export const destroy = async (req, res) => {
    try {
        await Diary.destroy({where: {id: req.params.id}});
        res.redirect("/diaries");
    } catch(e) {
        res.render("error_pages/error", {
            error: e
        });
    }
}