import crypto from "crypto";

const hashPassword = (password: string, salt: string) => {
  return crypto
    .pbkdf2Sync(password, salt, 100_000, 64, "sha512")
    .toString("hex");
};

const comparePassword = (password: string, hash: string, salt: string) => {
  const hashed = hashPassword(password, salt);
  return crypto.timingSafeEqual(
    Buffer.from(hashed, "hex"),
    Buffer.from(hash, "hex"),
  );
};

const genSalt = (length: number = 32) => {
  return crypto.randomBytes(length).toString("hex");
};

export { comparePassword, genSalt, hashPassword };

