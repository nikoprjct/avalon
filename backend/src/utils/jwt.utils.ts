import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXPIRES_IN: SignOptions['expiresIn'] = process.env.JWT_ACCESS_EXPIRES_IN as SignOptions['expiresIn'] || "15m";
const REFRESH_EXPIRES_IN: SignOptions['expiresIn'] = process.env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'] || "7d";

export class JwtUtils {
  static generateAccessToken(payload: object, expiresIn: SignOptions['expiresIn'] = ACCESS_EXPIRES_IN): string {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn });
  }

  static generateRefreshToken(payload: object, expiresIn: SignOptions['expiresIn'] = REFRESH_EXPIRES_IN): string {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn });
  }

  static verifyAccessToken(token: string): object | null {
    try {
      return jwt.verify(token, ACCESS_SECRET) as object;
    } catch {
      return null;
    }
  }

  static verifyRefreshToken(token: string): object | null {
    try {
      return jwt.verify(token, REFRESH_SECRET) as object;
    } catch {
      return null;
    }
  }

  static decodeToken(token: string): object | null {
    const decoded = jwt.decode(token);
    return decoded && typeof decoded === "object" ? decoded : null;
  }
}
