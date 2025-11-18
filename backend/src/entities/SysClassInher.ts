import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { SysClass } from "./SysClass";

@Entity("sys_class_inher")
export class SysClassInher {
  @PrimaryGeneratedColumn("uuid", { name: "class_inher_uid"  })
  inherUID!: string;

  @Column({ name: "metaclass_uid", type: "uuid" })
  metaclassUID!: string;

  @Column({ name: "parent_uid", type: "uuid" })
  parentUID!: string;

  @Column({ name: "child_uid", type: "uuid" })
  childUID!: string;

  @Column({ name: "created_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @ManyToOne(() => SysClass)
  @JoinColumn({ name: "metaclass_uid", referencedColumnName: "classUID" })
  metaClass!: SysClass;

  @ManyToOne(() => SysClass)
  @JoinColumn({ name: "parent_uid", referencedColumnName: "classUID" })
  parentClass!: SysClass;

  @ManyToOne(() => SysClass)
  @JoinColumn({ name: "child_uid", referencedColumnName: "classUID" })
  childClass!: SysClass;
}
