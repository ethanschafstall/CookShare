import * as z from "zod";

const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const RegisterSchema = z.object({
  email: z.email(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

type LoginInput = z.infer<typeof LoginSchema>;
type RegisterInput = z.infer<typeof RegisterSchema>;

export default { LoginSchema, RegisterSchema };
export type { LoginInput, RegisterInput };
