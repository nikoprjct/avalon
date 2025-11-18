import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../config/database";
import { SysUser } from "../../entities/SysUser";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export class AuthService {
  private userRepo = AppDataSource.getRepository(SysUser);

  async validateUser(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) return null;
    const isValid = await bcrypt.compare(password, user.passwordHash);
    return isValid ? user : null;
  }

  generateTokens(userUID: string) {
    const accessToken = jwt.sign({ userUID }, ACCESS_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userUID }, REFRESH_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userUID: string, token: string) {
    const user = await this.userRepo.findOneBy({ userUID: userUID });
    if (user) {
      user.refreshToken = token;
      await this.userRepo.save(user);
    }
  }

  async refreshToken(token: string) {
    try {
      const payload: any = jwt.verify(token, REFRESH_SECRET);
      return this.generateTokens(payload.userId);
    } catch {
      return null;
    }
  }
}
