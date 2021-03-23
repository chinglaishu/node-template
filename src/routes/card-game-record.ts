import express from "express";
import Query from "../query/Query";
import CardGameRecord from "../../models/CardGameRecord";
import Column from "../utils/Column";

const router = express.Router();

router.post("/new", async (req, res, next) => {
  try {
    const result = await Query.create(CardGameRecord, req.body, Column.CardGameRecord.create);
    return res.status(200).json({ success: true, result: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false });
  }
});

router.get("/list", async (req, res, next) => {
  try {
    const result = await Query.getList(CardGameRecord, "name", [], []);
    return res.status(200).json({ success: true, result: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false });
  }
});

export default router;
