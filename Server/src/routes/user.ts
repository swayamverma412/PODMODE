import { Router } from "express";
import { body, validationResult } from "express-validator";
import { createNewUser, signin, verify } from "../controllers/user";
const user = Router();

//* SIGNUP
user.post("/signup", createNewUser);

//* LOGIN
user.post("/login", signin);
user.post("/verify", verify);

export default user;
