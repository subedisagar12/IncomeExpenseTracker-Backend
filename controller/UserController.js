import { ErrorResponse, SuccessResponse } from "../helper/ResponseHelper.js";
import User from "../models/User.js";
import passwordHash from "password-hash";

export const CreateUser = async (req, res) => {
  let { firstName, lastName, email, password, preferredCurrency } = req.body;

  if (firstName === "" || !firstName) {
    return ErrorResponse(res, "First Name is empty");
  }

  if (lastName === "" || !lastName) {
    return ErrorResponse(res, "Last Name is empty");
  }

  if (email === "" || !email) {
    return ErrorResponse(res, "Email is empty");
  }

  if (password === "" || !password) {
    return ErrorResponse(res, "Password is empty");
  }

  try {
    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return ErrorResponse(res, "Email Already in use.");
    }

    await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash.generate(password),
      preferredCurrency,
      //Hashing the pasword in database
    }).then((data) => SuccessResponse(res, "Registration successfull", data));
  } catch (e) {
    return ErrorResponse(res, e.message);
  }
};

export const GetUser = (req, res) => {
  return SuccessResponse(res, "Data Fetched", null);
};
