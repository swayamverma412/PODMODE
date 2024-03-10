import prisma from "../db";
import { createJWT, hashPassword, comparePasswords } from "../module/user";
import jwt from "jsonwebtoken";

export const createNewUser = async (req, res) => {
  const { name, email, password, creator } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  console.log("USER", user);

  if (user) {
    return res.json({ message: "User already exists!" });
  }
  const hash = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
      creator,
    },
  });

  const token = await createJWT(newUser);
  res.json({ token });
};

export const signin = async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(401).json({ message: "This email does not exist" });
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = createJWT(user);
  console.log(token);

  res.json({ token, user });
};

export const verify = (req, res) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.json({ status: false, user: null });
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    console.log("here");
    return res.json({ status: false, user: null });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payload", payload);

    return res.json({ status: true, user: payload });
  } catch (e) {
    console.error(e);
    return res.json({ status: false, user: null });
  }
};
