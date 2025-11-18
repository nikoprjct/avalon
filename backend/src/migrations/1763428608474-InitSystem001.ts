import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSystem0011763428608474 implements MigrationInterface {
    name = 'InitSystem0011763428608474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sys_class" ("class_uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "metaclass_uid" character varying NOT NULL, "class_code" character varying NOT NULL, "class_descr" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_aca2c0b74dc492e27c7633ed9f0" PRIMARY KEY ("class_uid"))`);
        await queryRunner.query(`CREATE TABLE "sys_class_feature" ("feature_uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "metaclass_uid" uuid NOT NULL, "feature_type_uid" uuid NOT NULL, "feature_code" character varying NOT NULL, "feature_descr" character varying NOT NULL, "datatype" character varying NOT NULL, "visibility" character varying NOT NULL, "is_inherited" boolean NOT NULL, "inherited_from" uuid, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_7c566f309ce1fac84ef431a3935" PRIMARY KEY ("feature_uid"))`);
        await queryRunner.query(`CREATE TABLE "sys_user" ("user_uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password_hash" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "refresh_token" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9e7164b2f1ea1348bc0eb0a7da4" UNIQUE ("username"), CONSTRAINT "PK_4e9d56feac3370991f506ac13ba" PRIMARY KEY ("user_uid"))`);
        await queryRunner.query(`CREATE TABLE "sys_user_role" ("user_role_uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_uid" character varying NOT NULL, "role_uid" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userUserUID" uuid, "roleRoleUID" uuid, CONSTRAINT "PK_d25a07a776faae7111f32a8e3dd" PRIMARY KEY ("user_role_uid"))`);
        await queryRunner.query(`CREATE TABLE "sys_role" ("role_uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "role_code" character varying NOT NULL, "role_name" character varying NOT NULL, "role_descr" character varying, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fd8cc60f0258a8d5948141d98e8" UNIQUE ("role_code"), CONSTRAINT "PK_c985863101ca89ec6b8e91ee751" PRIMARY KEY ("role_uid"))`);
        await queryRunner.query(`CREATE TABLE "sys_class_inher" ("class_inher_uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "metaclass_uid" uuid NOT NULL, "parent_uid" uuid NOT NULL, "child_uid" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4bbc987f2fb769ea1c5f0f03fe0" PRIMARY KEY ("class_inher_uid"))`);
        await queryRunner.query(`ALTER TABLE "sys_class_feature" ADD CONSTRAINT "FK_bfd98a366ba5953ed2d18e877da" FOREIGN KEY ("metaclass_uid") REFERENCES "sys_class"("class_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sys_class_feature" ADD CONSTRAINT "FK_c5310b5643e9949e27ed2acad51" FOREIGN KEY ("feature_type_uid") REFERENCES "sys_class"("class_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sys_class_feature" ADD CONSTRAINT "FK_9e55a90d225135ad0a9723b947c" FOREIGN KEY ("inherited_from") REFERENCES "sys_class"("class_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sys_user_role" ADD CONSTRAINT "FK_36073b3c37fe4dfd7a1ed778c2c" FOREIGN KEY ("userUserUID") REFERENCES "sys_user"("user_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sys_user_role" ADD CONSTRAINT "FK_36350ff2b3f0e0491b99951db10" FOREIGN KEY ("roleRoleUID") REFERENCES "sys_role"("role_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sys_class_inher" ADD CONSTRAINT "FK_afad8e1cae2e1d0a180821b41e7" FOREIGN KEY ("metaclass_uid") REFERENCES "sys_class"("class_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sys_class_inher" ADD CONSTRAINT "FK_6cebb2a6d3461828bf6ae2f9230" FOREIGN KEY ("parent_uid") REFERENCES "sys_class"("class_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sys_class_inher" ADD CONSTRAINT "FK_8808c1b0a0f90b762d52731b748" FOREIGN KEY ("child_uid") REFERENCES "sys_class"("class_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sys_class_inher" DROP CONSTRAINT "FK_8808c1b0a0f90b762d52731b748"`);
        await queryRunner.query(`ALTER TABLE "sys_class_inher" DROP CONSTRAINT "FK_6cebb2a6d3461828bf6ae2f9230"`);
        await queryRunner.query(`ALTER TABLE "sys_class_inher" DROP CONSTRAINT "FK_afad8e1cae2e1d0a180821b41e7"`);
        await queryRunner.query(`ALTER TABLE "sys_user_role" DROP CONSTRAINT "FK_36350ff2b3f0e0491b99951db10"`);
        await queryRunner.query(`ALTER TABLE "sys_user_role" DROP CONSTRAINT "FK_36073b3c37fe4dfd7a1ed778c2c"`);
        await queryRunner.query(`ALTER TABLE "sys_class_feature" DROP CONSTRAINT "FK_9e55a90d225135ad0a9723b947c"`);
        await queryRunner.query(`ALTER TABLE "sys_class_feature" DROP CONSTRAINT "FK_c5310b5643e9949e27ed2acad51"`);
        await queryRunner.query(`ALTER TABLE "sys_class_feature" DROP CONSTRAINT "FK_bfd98a366ba5953ed2d18e877da"`);
        await queryRunner.query(`DROP TABLE "sys_class_inher"`);
        await queryRunner.query(`DROP TABLE "sys_role"`);
        await queryRunner.query(`DROP TABLE "sys_user_role"`);
        await queryRunner.query(`DROP TABLE "sys_user"`);
        await queryRunner.query(`DROP TABLE "sys_class_feature"`);
        await queryRunner.query(`DROP TABLE "sys_class"`);
    }

}
