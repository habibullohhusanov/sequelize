import { Router } from "express";
import { auth } from "../middlaware/auth.js";
import {index, create, store, view, edit, update, destroy} from "../controller/diaryController.js";

const router = Router();

router.get("/", auth, index);
router.get("/create", auth, create);
router.post("/", auth, store);
router.get("/:id", auth, view);
router.get("/:id/edit", auth, edit);
router.put("/:id", auth, update);
router.delete("/:id", auth, destroy);

export default router;