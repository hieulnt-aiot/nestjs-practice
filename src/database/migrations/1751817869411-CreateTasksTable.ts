import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasksTable1751817869411 implements MigrationInterface {
  name = 'CreateTasksTable1751817869411';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tasks\` ADD \`filePath\` varchar(255) NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`filePath\``);
  }
}
