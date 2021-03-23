import express from "express";
import user from "./card-game-record";

const router = express.Router();

router.use("/api/card-game-record", user);

export default router;
