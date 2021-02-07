import express from "express";
import user from "./user";
import order from "./order";

const router = express.Router();

router.use("/api/user", user);
router.use("/api/order", order);

export default router;
