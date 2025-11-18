import { DataSource } from "typeorm";
import { env } from "./env";
import { SysClassFeature } from "../entities/SysClassFeature";
import { SysClass } from "../entities/SysClass";
import { SysRole } from "../entities/SysRole";
import { SysUser } from "../entities/SysUser";
import { SysUserRole } from "../entities/SysUserRole";
import { SysClassInher } from "../entities/SysClassInher";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [SysUser, SysRole, SysClass, SysClassFeature, SysUserRole, SysClassInher],
    migrations: ["dist/migrations/*.js"],
});