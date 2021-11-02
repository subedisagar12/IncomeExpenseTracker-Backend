import jwt from "jsonwebtoken";
import { ErrorResponse } from "../helper/ResponseHelper.js";

// This middleware is used to make route private
export const Authenticate = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return ErrorResponse(res, "UnAuthorized access");
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    if (!verified) {
      return ErrorResponse(res, "Invalid Token");
    }
    req.user = verified;
    next();
  } catch (e) {
    return ErrorResponse(res, e.message);
  }
};
