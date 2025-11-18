import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { SysClass } from "./SysClass";

@Entity("sys_class_feature")
export class SysClassFeature {
    @PrimaryGeneratedColumn("uuid", { name: "feature_uid" })
    featureUID!: string;

    @Column({ name: "metaclass_uid", type: "uuid" })
    metaclassUID!: string;

    @Column({ name: "feature_type_uid", type: "uuid" })
    featureTypeUID!: string;

    @Column({ name: "feature_code" })
    classCode!: string;

    @Column({ name: "feature_descr" })
    classDescr!: string;

    @Column({ name: "datatype" })
    datatype!: string;

    @Column({ name: "visibility" })
    visibility!: string;

    @Column({ name: "is_inherited" })
    isInherited!: boolean;

    @Column({ name: "inherited_from", type: "uuid", nullable: true })
    inheritedFrom?: string;

    @Column({ name: "created_at" })
    createdAt!: Date;

    @Column({ name: "updated_at" })
    updatedAt!: Date;

    // Метакласс
    @ManyToOne(() => SysClass, (cls: SysClass) => cls.features)
    @JoinColumn({ name: "metaclass_uid", referencedColumnName: "classUID" })
    metaClass!: SysClass;

    // Тип фичи
    @ManyToOne(() => SysClass)
    @JoinColumn({ name: "feature_type_uid", referencedColumnName: "classUID" })
    featureType!: SysClass;

    // Откуда унаследовано
    @ManyToOne(() => SysClass)
    @JoinColumn({ name: "inherited_from", referencedColumnName: "classUID" })
    inheritedFromClass!: SysClass;
}
