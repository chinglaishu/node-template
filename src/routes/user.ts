import express from "express";
import Query from "../query/Query";
import UserQuery from "../query/UserQuery";
import AuthHandler from "../utils/AuthHandler";
import PassportAuth from "../utils/PassportAuth";
import User from "../../models/User";
import Column from "../utils/Column";

const router = express.Router();

router.post("/login", PassportAuth.authenticate("login", {session: false}), async (req, res, next) => {
  try {
    const userObj = (req as any).user;
    const token = AuthHandler.createToken(userObj.user_id);
    return res.status(200).json({ success: true, result: {token, userObj} });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

router.post("/change-password", PassportAuth.authenticate("login", {session: false}), async (req, res, next) => {
  try {
    const {user_id} = (req as any).user;
    req.body.user_id = user_id;
    // need change
    req.body.password = AuthHandler.addSaltAndHashPassword(req.body.newPassword);
    const result = await Query.edit(User, "user_id", req.body, Column.User.changePassword, "user_id", user_id);
    return res.status(200).json({ success: true, result: result });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

// create
router.post("/register", async (req, res, next) => {
  try {
    const {username, password, register_token} = req.body;
    req.body.home = {district: "District A", building: "Building A1"};
    const result = await UserQuery.create(req.body);
    return res.status(200).json({ success: true, result: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false });
  }
});

router.put("/edit", PassportAuth.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const {user_id} = (req as any).user;
    req.body.user_id = user_id;
    const result = await Query.edit(User, "user_id", req.body, Column.User.edit, "user_id", user_id);
    return res.status(200).json({ success: true, result: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false });
  }
});

router.get("/list", PassportAuth.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const {id_list} = req.headers;
    const useIdList = (id_list) ? JSON.parse(String(id_list)) : null;
    const result = await Query.getList(User, "user_id", useIdList, ["password"]);
    return res.status(200).json({ success: true, result: result });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

router.get("/:id", PassportAuth.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await Query.get(User, "user_id", id, ["password"]);
    return res.status(200).json({ success: true, result: result });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

export default router;
