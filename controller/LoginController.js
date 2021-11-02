import User from "../models/User.js";
import { SuccessResponse, ErrorResponse } from "../helper/ResponseHelper.js";
import passwordHash from "password-hash";
import jwt from "jsonwebtoken";
// Login Controller
export const Login = async (req, res) => {
  if (
    req.body.email === "" ||
    req.body.password === "" ||
    !req.body.email ||
    !req.body.password
  ) {
    return ErrorResponse(res, "Empty field has been found");
  }
  try {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        let token = "";
        //   Password Verification
        let isPasswordVerified = passwordHash.verify(
          req.body.password,
          user.password
        );
        if (!isPasswordVerified) {
          return ErrorResponse(res, "Incorrect Password");
        }

        token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            currency: user.preferredCurrency,
          },
          process.env.SECRET_KEY
        );

        return SuccessResponse(res, "Login success", user, {
          token,
        });
      })
      .catch((e) => ErrorResponse(res, "Email not registered"));
  } catch (e) {
    return ErrorResponse(res, e.message);
  }
};
