import User from "../../models/user/user.js";
import createError from "http-errors";
import bcrypt from "bcrypt";
import generateToken from "../../middlewares/token/token.js";


//==========================================================================
// Register new user
//==========================================================================
export const createUser = async (req, res, next) => {
  const { firstName, lastName, email, password, agree } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "Email has been taken. Please try another one!" });
    }

    if (!user) {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        agree,
      });

      try {
        await newUser.save();
      } catch (error) {
        console.log(error);
        return next(createError(500, "User could not be saved"));
      }

      const token = generateToken(newUser);

      res
        .cookie("token", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          secure: process.env.NODE_ENV === "production",
        })
        .status(201)
        .json({
          success: true,
          message: "Account successfully created!",
        });
    }
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error! please try again!"));
  }
};