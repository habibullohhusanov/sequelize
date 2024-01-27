import { Router } from "express";
import { auth, guest } from "../middlaware/auth.js";
import { login, login_view, logout, register, register_veiw } from "../controller/authController.js";

const router = Router();

router.get("/login", guest, login_view);
router.post("/login", guest, login);
router.get("/register", guest, register_veiw);
router.post("/register", guest, register);
router.post("/logout", auth, logout);

export default router;