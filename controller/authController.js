import bcrypt from "bcryptjs";
import db from "../config/db.js";
import { loginRequest, registerRequest } from "../request/authRequest.js";

const User = db.user;

export const login_view = async (req, res) => {
    try {
        return res.render("diaries/login");
    } catch (e) {
        return res.render("error_pages/error", {
            error: e
        });
    }
}
export const login = async (req, res) => {
    try {
        let loginData = req.body;
        let { error } = loginRequest.validate(loginData);
        if (error) {
            return res.redirect("/auth/login");
        }
        let { email, password } = req.body;
        let user = await User.findOne({
            raw: true,
            where: { email: email },
        });
        if (user && user.email == email) {
            let passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                req.session.isLogin = true;
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
                req.session.save(err => {
                    console.log(err);
                    return res.redirect("/auth/login");
                })
                return res.redirect("/diaries");
            }
        }
        return res.redirect("/auth/login");
    } catch (e) {
        return res.render("error_pages/error", {
            error: e
        });
    }
}
export const register_veiw = async (req, res) => {
    try {
        return res.render("diaries/register");
    } catch (e) {
        return res.render("error_pages/error", {
            error: e
        });
    }
}
export const register = async (req, res) => {
    try {
        let registerData = req.body;
        let { error } = registerRequest.validate(registerData);
        if (error) {
            console.log("Validate error");
            return res.redirect("/auth/register");
        } else {
            let { name, email, password, password_confirmation } = req.body;
            let user = await User.findOne({
                where: { email: email },
            });
            if (!user || user.email !== req.body.email) {
                await bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.redirect("/auth/register");
                    } else {
                        User.create({
                            name,
                            email,
                            password: hash
                        });
                        req.session.isLogin = true;
                        req.session.user = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                        };
                        return res.redirect("/diaries");
                    }
                });
            } else {
                return res.redirect("/auth/register");
            }
        }
    } catch (e) {
        console.log("register");
        return res.render("error_pages/error", {
            error: e
        });
    }

}
export const logout = async (req, res) => {
    await req.session.destroy(() => {
        return res.redirect("/");
    });
}
