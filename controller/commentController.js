import db from "../config/db.js";

const Comment = db.comment;

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
        const {comment} = req.body;
        await Comment.create({
            comment: comment,
            diaryId: req.params.id
        });
        res.redirect(`/diaries/${req.params.id}`);
    } catch(e) {
        res.render("error_pages/error", {
            error: e
        });
    }
}
export const view = async (req, res) => {
    try {
        const diary = await Diary.findAll({where: {
            id: req.params.id
        }});
        res.render("diaries/user", {
            diary: diary,
        });
    } catch(e) {
        res.render("error_pages/error", {
            error: e
        });
    }
}
export const edit = async (req, res) => {
    try {
        const diary = await Diary.findOne({where: {
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
        const diary = await Diary.findOne({where: {
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
        res.redirect("/users");
    } catch(e) {
        res.render("error_pages/error", {
            error: e
        });
    }
}
export const destroy = async (req, res) => {
    try {
        await Diary.destroy({where: {id: req.params.id}});
        res.redirect("/users");
    } catch(e) {
        res.render("error_pages/error", {
            error: e
        });
    }
}