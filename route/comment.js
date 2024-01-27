import {Router} from "express";
import { auth } from "../middlaware/auth.js";
import { create, destroy, edit, index, store, update, view } from "../controller/commentController.js";

const router = Router();

router.get("/:id/diary", auth, index);
router.get("/:id/diary/create", auth, create);
router.post("/:id/diary", auth, store);
router.get("/:id/diary/:id", auth, view);
router.get("/:id/diary/:id/edit", auth, edit);
router.put("/:id/diary/:id", auth, update);
router.delete("/:id/diary/:id", auth, destroy);

export default router;