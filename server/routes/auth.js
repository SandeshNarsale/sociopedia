import express from "express";
import { login } from "../controllers/auth.js";

const router =express.Router();

router.post("/login",login); /* use auth/login  beacause call from another route auth*/

export default router;