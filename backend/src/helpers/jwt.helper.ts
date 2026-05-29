import jwt from "jsonwebtoken";
const privateKey = process.env.PRIVATE_KEY!;

const generateToken = (user: { email: string; id: number; role: string }) => {
  const payload = user;
  const options = {
    expiresIn: 3 * 24 * 60 * 60,
  };
  const token = jwt.sign(payload, privateKey, options);
  return token;
};

export default generateToken;
