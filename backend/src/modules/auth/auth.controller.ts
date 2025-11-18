import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const service = new AuthService();

export class AuthController {
  static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await service.validateUser(username, password);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const tokens = service.generateTokens(user.userUID);
    await service.saveRefreshToken(user.userUID, tokens.refreshToken);
    res.json(tokens);
  }

  static async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const tokens = await service.refreshToken(refreshToken);
    if (!tokens) return res.status(401).json({ error: "Invalid refresh token" });
    res.json(tokens);
  }
}
