 import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SysRole } from "./SysRole";
import { SysUser } from "./SysUser";

@Entity("sys_user_role")
export class SysUserRole {
  @PrimaryGeneratedColumn("uuid", { name: "user_role_uid" })
  userRoleUID!: string;

  @Column({ name: "user_uid" })
  userUID!: string;

  @Column({ name: "role_uid" })
  roleUID!: number;

  @Column({ name: "is_active", default: true })
  isActive!: boolean;

  @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
  
  @Column({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;

  @ManyToOne(() => SysUser, (user:SysUser) => user.userRoles)
  user!: SysUser;

  @ManyToOne(() => SysRole, (role:SysRole) => role.userRoles)
  role!: SysRole;
}