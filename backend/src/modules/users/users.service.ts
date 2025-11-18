import { AppDataSource } from "../../config/database";
import { SysUser } from "../../entities/SysUser";
import { redis } from "../../services/redis";

export class UsersService {
  private userRepo = AppDataSource.getRepository(SysUser);
  async list(limit = 10) {
    const cache = await redis.get("users");
    if (cache) return JSON.parse(cache);

    const users = await this.userRepo.find({ take: limit });
    await redis.set("users", JSON.stringify(users), "EX", 60);
    return users;
  }

  // Здесь можно добавить другие методы: create, update, delete, findById и т.д.
}
