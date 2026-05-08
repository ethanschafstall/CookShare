import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "@errors/app.error.js";
import generateToken from "@helpers/jwt.helper.js";
import {
  comparePassword,
  genSalt,
  hashPassword,
} from "@helpers/password.helper.js";
import { UserRepository } from "@repositories/user.repository.js";
import { LoginInput, RegisterInput } from "@validators/auth.validator.js";

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async login(input: LoginInput) {
    const user = await this.userRepo.getByEmail(input.email);
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }
    const isValid = comparePassword(
      input.password,
      user.passwordHash,
      user.passwordSalt,
    );
    if (!isValid) {
      throw new UnauthorizedError("Invalid email or password");
    }
    const payload = { id: user.id, email: user.email, role: user.role.name };
    const token = generateToken(payload);
    return { token };
  }
  async register(input: RegisterInput) {
    const existingUser = await this.userRepo.getByEmail(input.email);
    if (existingUser) {
      throw new ConflictError("Email already in use");
    }
    const salt = genSalt();
    const safePassword = hashPassword(input.password, salt);
    const user = await this.userRepo.create({
      email: input.email,
      passwordHash: safePassword,
      passwordSalt: salt,
      firstname: input.firstname,
      lastname: input.lastname,
    });
    if (!user) {
      throw new Error("Failed to create user");
    }
    return;
  }
  async getMe(id: number) {
    const user = await this.userRepo.getById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const safeUser = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role.name,
      permissions: user.role.permissions,
    };
    return safeUser;
  }
}
