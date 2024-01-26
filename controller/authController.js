import bcrypt from "bcryptjs";
import db from "../config/db.js";
import { loginRequest, registerRequest } from "../request/authRequest.js";

const User = db.user;

export const login_view = async (req, res) => {
    try {
        res.render("diaries/login");
    } catch (e) {
        res.render("error_pages/error", {
            error: e
        });
    }
}
export const login = async (req, res) => {
    try {
        const loginData = req.body;
        let { error } = loginRequest.validate(loginData);
        if (error) {
            res.redirect("/auth/login");
        } else {
            req.isLogin = true;
            res.redirect("/diaries");
        }
    } catch (e) {
        res.render("error_pages/error", {
            error: e
        });
    }
}
export const register_veiw = async (req, res) => {
    try {
        res.render("diaries/register");
    } catch (e) {
        res.render("error_pages/error", {
            error: e
        });
    }
}
export const register = async (req, res) => {
    try {
        let { error } = registerRequest.validate(req.body);
        if (error) {
            console.log("Validate error");
            res.redirect("/auth/register");
        } else {
            let { name, email, password, password_confirmation } = req.body
            let user = User.findOne({
                where: { email: email },
            });
            if (user.email == req.body.email) {
                res.redirect("/auth/register");
            } else {
                // let salt = await bcrypt.getSalt("abdefghijklmnopqrstuvxyzg%^!@#$%^&*()123456789/-+,.|`~fsdbbn");
                await bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("User yaratildi");
                        User.create({
                            name,
                            email,
                            password: hash
                        });
                    }
                });
                res.redirect("/diaries");
            }
        }
    } catch (e) {
        res.render("error_pages/error", {
            error: e
        });
    }

}
export const logout = async (req, res) => {

}
