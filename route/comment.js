import {Router} from "express";
import { create, destroy, edit, index, store, update, view } from "../controller/commentController.js";

const router = Router();

router.get("/:id/diary", index);
router.get("/:id/diary/create", create);
router.post("/:id/diary", store);
router.get("/:id/diary/:id", view);
router.get("/:id/diary/:id/edit", edit);
router.put("/:id/diary/:id", update);
router.delete("/:id/diary/:id", destroy);

export default router;