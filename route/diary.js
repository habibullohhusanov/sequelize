import { Router } from "express";
import {index, create, store, view, edit, update, destroy} from "../controller/diaryController.js";

const router = Router();

router.get("/", index);
router.get("/create", create);
router.post("/", store);
router.get("/:id", view);
router.get("/:id/edit", edit);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;