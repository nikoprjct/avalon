import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { SysUserRole } from "./SysUserRole";

@Entity("sys_role")
export class SysRole {
  @PrimaryGeneratedColumn("uuid", { name: "role_uid"  })
  roleUID!: string;

  @Column({ unique: true, name: "role_code" })
  roleCode!: string; // например "ADMIN", "USER"

  @Column({ name: "role_name" })
  roleName!: string;

  @Column({ name: "role_descr", nullable: true })
  roleDescr?: string;

  @Column({ name: "is_active", default: true })
  isActive!: boolean;

  @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
  
  @Column({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;

  @OneToMany(() => SysUserRole, (userRole) => userRole.role)
  userRoles!: SysUserRole[];
}
