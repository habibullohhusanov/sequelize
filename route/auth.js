import { Router } from "express";
import { login, login_view, logout, register, register_veiw } from "../controller/authController.js";

const router = Router();

router.get("/login", login_view);
router.post("/login", login);
router.get("/register", register_veiw);
router.post("/register", register);
router.post("/logout", logout);

export default router;