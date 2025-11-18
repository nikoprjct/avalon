import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SysUserRole } from "./SysUserRole";

@Entity("sys_user")
export class SysUser {
  @PrimaryGeneratedColumn("uuid", {name: "user_uid" })
  userUID!: string;

  @Column({ unique: true, name: "username" })
  username!: string;

  @Column({ name: "password_hash" })
  passwordHash!: string;

  @Column({ name: "is_active", default: true })
  isActive!: boolean;

  @Column({ name: "refresh_token", nullable: true })
  refreshToken?: string;

  @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
  
  @Column({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;

  @OneToMany(() => SysUserRole, (userRole) => userRole.user)
  userRoles!: SysUserRole[];
}
