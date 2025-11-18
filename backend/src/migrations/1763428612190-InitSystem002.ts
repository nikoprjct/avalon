import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSystem0021763428612190 implements MigrationInterface {
    name = 'InitSystem0021763428612190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Процедура рекурсивного наследования
        await queryRunner.query(`
            CREATE OR REPLACE PROCEDURE public.sys_class_inher_features_recursive()
            LANGUAGE plpgsql
            AS $procedure$
            DECLARE
                rec_parent RECORD;
                v_inheritance_uid uuid;
            BEGIN
                SELECT class_uid INTO v_inheritance_uid FROM sys_class WHERE class_code='Inheritance';
                FOR rec_parent IN
                    SELECT DISTINCT parent_uid
                    FROM sys_class_inher
                    WHERE metaclass_uid = v_inheritance_uid
                LOOP
                    PERFORM sys_class_inher_features_recursive_func(rec_parent.parent_uid);
                END LOOP;
            END;
            $procedure$;
        `);

        // Функция рекурсивного копирования фич
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION public.sys_class_inher_features_recursive_func(p_class_uid uuid)
            RETURNS void
            LANGUAGE plpgsql
            AS $function$
            DECLARE
                rec_inher RECORD;
            BEGIN
                FOR rec_inher IN
                    SELECT child_uid
                    FROM sys_class_inher
                    WHERE parent_uid = p_class_uid
                      AND class_uid = (SELECT class_uid FROM sys_class WHERE class_code='Inheritance')
                LOOP
                    INSERT INTO sys_class_feature(class_uid, feature_type_uid, feature_code, feature_descr, datatype, visibility, is_inherited, inherited_from)
                    SELECT 
                        rec_inher.child_uid,
                        f.feature_type_uid,
                        f.feature_code,
                        f.feature_descr,
                        f.datatype,
                        f.visibility,
                        true,
                        f.metaclass_uid
                    FROM sys_class_feature f
                    WHERE f.metaclass_uid = p_class_uid
                      AND NOT EXISTS (
                          SELECT 1
                          FROM sys_class_feature c
                          WHERE c.metaclass_uid = rec_inher.child_uid
                            AND c.feature_code = f.feature_code
                            AND c.feature_type_uid = f.feature_type_uid
                      );
                    PERFORM sys_class_inher_features_recursive_func(rec_inher.child_uid);
                END LOOP;
            END;
            $function$;
        `);

        // Функции для триггеров
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION public.sys_class_trg_delete_inherited_feature()
            RETURNS trigger
            LANGUAGE plpgsql
            AS $function$
            DECLARE
                rec_inher RECORD;
            BEGIN
                FOR rec_inher IN
                    SELECT child_uid
                    FROM sys_class_inher
                    WHERE parent_uid = OLD.class_uid
                      AND metaclass_uid = (SELECT class_uid FROM sys_class WHERE class_code='Inheritance')
                LOOP
                    DELETE FROM sys_class_feature
                    WHERE metaclass_uid = rec_inher.child_uid
                      AND feature_code = OLD.feature_code
                      AND feature_type_uid = OLD.feature_type_uid
                      AND inherited_from = OLD.metaclass_uid;
                    PERFORM sys_class_trg_delete_inherited_feature_recursive(rec_inher.child_uid, OLD.feature_code, OLD.feature_type_uid, OLD.metaclass_uid);
                END LOOP;
                RETURN OLD;
            END;
            $function$;
        `);

        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION public.sys_class_trg_delete_inherited_feature_recursive(p_metaclass_uid uuid, p_feature_code varchar, p_feature_type_uid uuid, p_parent_uid uuid)
            RETURNS void
            LANGUAGE plpgsql
            AS $function$
            DECLARE
                rec_inher RECORD;
            BEGIN
                FOR rec_inher IN
                    SELECT metaclass_uid
                    FROM sys_class_inher
                    WHERE parent_uid = p_metaclass_uid
                      AND metaclass_uid = (SELECT class_uid FROM sys_class WHERE class_code='Inheritance')
                LOOP
                    DELETE FROM sys_class_feature
                    WHERE metaclass_uid = rec_inher.child_uid
                      AND feature_code = p_feature_code
                      AND feature_type_uid = p_feature_type_uid
                      AND inherited_from = p_parent_uid;
                    PERFORM sys_class_trg_delete_inherited_feature_recursive(rec_inher.child_uid, p_feature_code, p_feature_type_uid, p_parent_uid);
                END LOOP;
            END;
            $function$;
        `);

        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION public.sys_class_trg_inherit_feature_insert()
            RETURNS trigger
            LANGUAGE plpgsql
            AS $function$
            DECLARE
                rec_inher RECORD;
            BEGIN
                FOR rec_inher IN
                    SELECT metaclass_uid
                    FROM sys_class_inher
                    WHERE parent_uid = NEW.metaclass_uid
                      AND metaclass_uid = (SELECT class_uid FROM sys_class WHERE class_code='Inheritance')
                LOOP
                    INSERT INTO sys_class_feature(metaclass_uid, feature_type_uid, feature_code, feature_descr, datatype, visibility, is_inherited, inherited_from)
                    SELECT
                        rec_inher.child_uid,
                        NEW.feature_type_uid,
                        NEW.feature_code,
                        NEW.feature_descr,
                        NEW.datatype,
                        NEW.visibility,
                        true,
                        NEW.metaclass_uid
                    WHERE NOT EXISTS (
                        SELECT 1
                        FROM sys_class_feature c
                        WHERE c.metaclass_uid = rec_inher.child_uid
                          AND c.feature_code = NEW.feature_code
                          AND c.feature_type_uid = NEW.feature_type_uid
                    );
                    PERFORM sys_class_inher_features_recursive_func(rec_inher.child_uid);
                END LOOP;
                RETURN NEW;
            END;
            $function$;
        `);

        // Создание триггеров
        await queryRunner.query(`
            CREATE TRIGGER sys_class_trg_inherit_feature_insert 
            AFTER INSERT ON public.sys_class_feature
            FOR EACH ROW EXECUTE FUNCTION sys_class_trg_inherit_feature_insert();
        `);

        await queryRunner.query(`
            CREATE TRIGGER sys_class_trg_inherit_feature_delete
            AFTER DELETE ON public.sys_class_feature
            FOR EACH ROW EXECUTE FUNCTION sys_class_trg_delete_inherited_feature();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS sys_class_trg_inherit_feature_insert ON public.sys_class_feature;`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS sys_class_trg_inherit_feature_delete ON public.sys_class_feature;`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS public.sys_class_trg_inherit_feature_insert CASCADE;`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS public.sys_class_trg_delete_inherited_feature_recursive CASCADE;`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS public.sys_class_trg_delete_inherited_feature CASCADE;`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS public.sys_class_inher_features_recursive_func CASCADE;`);
        await queryRunner.query(`DROP PROCEDURE IF EXISTS public.sys_class_inher_features_recursive CASCADE;`);
    }
}
