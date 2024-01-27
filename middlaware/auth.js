export const auth = (req, res, next) => {
    if (!req.session.isLogin) {
        return res.redirect("/auth/login");
    }
    next();
}
export const guest = (req, res, next) => {
    if (req.session.isLogin) {
        return res.redirect('back');
    }
    next();
}