import bcrypt from "bcryptjs";
import db from "../config/db.js";
import { loginRequest, registerRequest } from "../request/authRequest.js";

const User = db.user;

export const login_view = async (req, res) => {
    try {
        return res.render("diaries/login", {
            error: req.flash("error"),
        });
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
            console.log("Validate error");
            req.flash("error", "Validate error")
            return res.redirect("/auth/login");
        }
        let { email, password } = req.body;
        let user = await User.findOne({
            where: { email: email },
        });
        if (!user) {
            console.log("User not found");
            req.flash("error", "Not Found");
            return res.redirect("/auth/login");
        } else {
            if (user.email == email) {
                let passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    req.session.isLogin = true;
                    req.session.user = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    };
                    req.session.save(err => {
                        if (err) {
                            console.log("Session error");
                            req.flash("error", "Try again");
                            return res.redirect("/auth/login");
                        } else {
                            console.log("Session success");
                            return res.redirect("/diaries");
                        }
                    });
                } else {
                    console.log("Password error");
                    req.flash("error", "Password error");
                    return res.redirect("/auth/login");
                }
            }
        }
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
            req.flash("error", "Validate error");
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
                        req.flash("error", "Try again");
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
                req.flash("error", "Already account exsist");
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
