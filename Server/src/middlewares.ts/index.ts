import { validationResult } from "express-validator";

export const handleInputError = (req, res, next) => {
  const errors = validationResult(req);
  console.log("ERROR IN handleInputError", errors.array());

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  next();
};
