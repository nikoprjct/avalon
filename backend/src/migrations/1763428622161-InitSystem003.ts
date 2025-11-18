import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSystem0031763428622161 implements MigrationInterface {
    name = 'InitSystem0031763428622161';
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Вставка данных в sys_class
    await queryRunner.query(`
      INSERT INTO public.sys_class (class_uid, metaclass_uid, class_code, class_descr, created_at, updated_at)
      VALUES
        ('fd2f1d16-22c6-4442-a478-06ce30edfbef', '3f2a6b00-f51f-4562-b276-6ee0d5ea8a1c', 'Class', 'Класс', '2025-11-17 23:01:29.747', '2025-11-17 23:01:53.238'),
        ('caf86ee0-d11d-4814-b15a-92ec9bde5256', 'fd2f1d16-22c6-4442-a478-06ce30edfbef', 'Inheritance', 'Наследование', '2025-11-17 23:01:29.747', '2025-11-17 23:01:53.238'),
        ('03a776ea-bf3a-4b9d-8f09-294570a1ce89', 'fd2f1d16-22c6-4442-a478-06ce30edfbef', 'Assoc', 'Ассоциация', '2025-11-17 23:01:29.747', '2025-11-17 23:01:53.238'),
        ('5135e6e1-e89d-4e56-9e65-7790da11cafc', 'fd2f1d16-22c6-4442-a478-06ce30edfbef', 'Composition', 'Композиция', '2025-11-17 23:01:29.747', '2025-11-17 23:01:53.238'),
        ('2add845f-3273-4114-bc97-8325a85cd689', 'fd2f1d16-22c6-4442-a478-06ce30edfbef', 'Aggregation', 'Агрегация', '2025-11-17 23:01:29.747', '2025-11-17 23:01:53.238'),
        ('daaee3d4-196f-4c8b-8146-1aaf60e64bc2', 'fd2f1d16-22c6-4442-a478-06ce30edfbef', 'Attr', 'Атрибут', '2025-11-17 23:01:29.747', '2025-11-17 23:01:53.238'),
        ('caab9ce7-3e9f-4ba4-8f57-61a025f3a9b2', 'fd2f1d16-22c6-4442-a478-06ce30edfbef', 'Method', 'Метод', '2025-11-17 23:01:29.747', '2025-11-17 23:01:53.238'),
        ('ee0fc306-5568-46ec-830b-1941fa70a726', 'fd2f1d16-22c6-4442-a478-06ce30edfbef', 'Document', 'Базовый документ', '2025-11-17 23:01:29.747', '2025-11-17 23:01:53.238'),
        ('d9b48dd1-d7f5-4ec9-ad34-ff3256e69851', 'fd2f1d16-22c6-4442-a478-06ce30edfbef', 'Contract', 'Договор', '2025-11-17 23:01:29.747', '2025-11-17 23:01:53.238'),
        ('80433273-d0fa-412e-9bdc-067e55b8a9c1', 'fd2f1d16-22c6-4442-a478-06ce30edfbef', 'Invoice', 'Инвойс', '2025-11-17 23:01:29.747', '2025-11-17 23:01:53.238')
      ON CONFLICT (class_uid) DO NOTHING;
    `);

    // Вставка данных в sys_class_feature
    await queryRunner.query(`
      INSERT INTO public.sys_class_feature 
        (feature_uid, metaclass_uid, feature_type_uid, feature_code, feature_descr, "datatype", visibility, is_inherited, inherited_from, created_at, updated_at)
      VALUES
        ('4d00846e-99a9-4a7f-9126-764a0002acda','ee0fc306-5568-46ec-830b-1941fa70a726','daaee3d4-196f-4c8b-8146-1aaf60e64bc2','docNumber','Номер документа','varchar','public',false,NULL,'2025-11-17 23:02:19.942','2025-11-17 23:02:37.064'),
        ('07168950-c175-4898-a7a9-49535cfcc89d','ee0fc306-5568-46ec-830b-1941fa70a726','daaee3d4-196f-4c8b-8146-1aaf60e64bc2','docDate','Дата документа','date','public',false,NULL,'2025-11-17 23:02:19.942','2025-11-17 23:02:37.064'),
        ('e72eb4c1-3f9a-44d3-bf6a-36307378e11f','ee0fc306-5568-46ec-830b-1941fa70a726','daaee3d4-196f-4c8b-8146-1aaf60e64bc2','amount','Сумма','numeric','public',false,NULL,'2025-11-17 23:02:19.942','2025-11-17 23:02:37.064')
      ON CONFLICT (feature_uid) DO NOTHING;
    `);

    // Вставка данных в sys_class_inher
    await queryRunner.query(`
      INSERT INTO public.sys_class_inher (class_inher_uid, metaclass_uid, parent_uid, child_uid, created_at)
      VALUES
        ('6de8f5e2-1093-4d49-bb06-56b6efff96ae','caf86ee0-d11d-4814-b15a-92ec9bde5256','ee0fc306-5568-46ec-830b-1941fa70a726','d9b48dd1-d7f5-4ec9-ad34-ff3256e69851','2025-11-17 23:02:56.474'),
        ('18dba596-e010-4dbf-a27b-28937d1e6e83','caf86ee0-d11d-4814-b15a-92ec9bde5256','ee0fc306-5568-46ec-830b-1941fa70a726','80433273-d0fa-412e-9bdc-067e55b8a9c1','2025-11-17 23:02:56.474')
      ON CONFLICT (class_inher_uid) DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Откат вставки данных
    await queryRunner.query(`
      DELETE FROM public.sys_class_inher 
      WHERE inher_uid IN ('6de8f5e2-1093-4d49-bb06-56b6efff96ae','18dba596-e010-4dbf-a27b-28937d1e6e83');
    `);

    await queryRunner.query(`
      DELETE FROM public.sys_class_feature 
      WHERE feature_uid IN ('4d00846e-99a9-4a7f-9126-764a0002acda','07168950-c175-4898-a7a9-49535cfcc89d','e72eb4c1-3f9a-44d3-bf6a-36307378e11f');
    `);

    await queryRunner.query(`
      DELETE FROM public.sys_class 
      WHERE class_uid IN (
        'fd2f1d16-22c6-4442-a478-06ce30edfbef',
        'caf86ee0-d11d-4814-b15a-92ec9bde5256',
        '03a776ea-bf3a-4b9d-8f09-294570a1ce89',
        '5135e6e1-e89d-4e56-9e65-7790da11cafc',
        '2add845f-3273-4114-bc97-8325a85cd689',
        'daaee3d4-196f-4c8b-8146-1aaf60e64bc2',
        'caab9ce7-3e9f-4ba4-8f57-61a025f3a9b2',
        'ee0fc306-5568-46ec-830b-1941fa70a726',
        'd9b48dd1-d7f5-4ec9-ad34-ff3256e69851',
        '80433273-d0fa-412e-9bdc-067e55b8a9c1'
      );
    `);
  }
}
