import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SysClassFeature } from "./SysClassFeature";

@Entity("sys_class")
export class SysClass {
    @PrimaryGeneratedColumn("uuid", { name: "class_uid" })
    classUID!: string;

    @Column({ name: "metaclass_uid" })
    metaclassUID!: string;

    @Column({ name: "class_code" })
    classCode!: string;

    @Column({ name: "class_descr" })
    classDescr!: string;

    @Column({ name: "created_at" })
    createdAt!: Date;

    @Column({ name: "updated_at" })
    updatedAt!: Date;

    @OneToMany(() => SysClassFeature, (feature: SysClassFeature) => feature.metaClass, { cascade: true })
    features!: SysClassFeature[];
}
