import { prisma as model } from "@db/prisma.js";
import { Prisma as client } from "@generated/prisma/client.js";

export class UserRepository {
  getByEmail(email: string) {
    return model.user.findUnique({ where: { email }, include: { role: true } });
  }

  getById(id: number) {
    return model.user.findUnique({ where: { id }, include: { role: true } });
  }

  create(data: client.UserCreateInput) {
    return model.user.create({ data });
  }

  update(id: number, data: client.UserUpdateInput) {
    return model.user.update({ where: { id }, data });
  }

  delete(id: number) {
    return model.user.delete({ where: { id } });
  }
}
