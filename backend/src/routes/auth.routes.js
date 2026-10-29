import { Router } from "express";
import { register,  login, profile } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", requireAuth, profile);
export default router; 
