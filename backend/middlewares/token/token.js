import JWT from "jsonwebtoken";

const generateToken = (user) => {
  const token = JWT.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

export default generateToken;
