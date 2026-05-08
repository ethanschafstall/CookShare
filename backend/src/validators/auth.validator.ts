import * as z from "zod";

const login = z.object({
  email: z.email(),
  password: z.string(),
});

const register = z.object({
  email: z.email(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

type LoginInput = z.infer<typeof login>;
type RegisterInput = z.infer<typeof register>;

export default { login, register };
export type { LoginInput, RegisterInput };

