import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1772271308817 implements MigrationInterface {
  name = 'InitialMigration1772271308817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('student', 'mentor')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "name" character varying NOT NULL, "avatar_url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_user_email" ON "users" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mentor_id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying, "invite_code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d93a573770a9d8c51c59c6c0f2d" UNIQUE ("invite_code"), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_group_invite_code" ON "groups" ("invite_code") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."assignments_language_enum" AS ENUM('python', 'javascript', 'java', 'cpp', 'typescript')`,
    );
    await queryRunner.query(
      `CREATE TABLE "assignments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "group_id" uuid NOT NULL, "mentor_id" uuid NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "language" "public"."assignments_language_enum" NOT NULL, "deadline" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c54ca359535e0012b04dcbd80ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_assignment_group" ON "assignments" ("group_id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."submissions_language_enum" AS ENUM('python', 'javascript', 'java', 'cpp', 'typescript')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."submissions_status_enum" AS ENUM('pending', 'in_review', 'changes_requested', 'approved')`,
    );
    await queryRunner.query(
      `CREATE TABLE "submissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "assignment_id" uuid NOT NULL, "student_id" uuid NOT NULL, "code" text NOT NULL, "file_name" character varying NOT NULL, "file_path" character varying NOT NULL, "version" integer NOT NULL, "language" "public"."submissions_language_enum" NOT NULL, "status" "public"."submissions_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_10b3be95b8b2fb1e482e07d706b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_189c1cab87a48d3795a6007a35" ON "submissions" ("assignment_id", "student_id", "version") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f043d0d459a667e9396e2a9086" ON "submissions" ("assignment_id", "student_id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."notifications_type_enum" AS ENUM('new_comment', 'status_changed', 'new_submission')`,
    );
    await queryRunner.query(
      `CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "type" "public"."notifications_type_enum" NOT NULL, "payload" jsonb NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_af08fad7c04bb85403970afdc1" ON "notifications" ("user_id", "is_read") `,
    );
    await queryRunner.query(
      `CREATE TABLE "group_members" ("group_id" uuid NOT NULL, "student_id" uuid NOT NULL, "joined_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a0cebd4894ed8e8372b5005a0ff" PRIMARY KEY ("group_id", "student_id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_a0cebd4894ed8e8372b5005a0f" ON "group_members" ("group_id", "student_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "submission_id" uuid NOT NULL, "author_id" uuid NOT NULL, "line_number" integer, "content" text NOT NULL, "code_snippet" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_comment_submission" ON "comments" ("submission_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ADD CONSTRAINT "FK_d933c06ab6d7ac8675f4803e1b5" FOREIGN KEY ("mentor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "assignments" ADD CONSTRAINT "FK_9a52a70c18d351ddab148eaf849" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "assignments" ADD CONSTRAINT "FK_72635d29a69791901b423dfbd2a" FOREIGN KEY ("mentor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "submissions" ADD CONSTRAINT "FK_8723840b9b0464206640c268abc" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "submissions" ADD CONSTRAINT "FK_435def3bbd4b4bbb9de1209cdae" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications" ADD CONSTRAINT "FK_9a8a82462cab47c73d25f49261f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_members" ADD CONSTRAINT "FK_2c840df5db52dc6b4a1b0b69c6e" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_members" ADD CONSTRAINT "FK_48b60c120c5dac01fe49d9be535" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_3b2c6c8f71fe860c00a3e74c003" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_e6d38899c31997c45d128a8973b" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_e6d38899c31997c45d128a8973b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_3b2c6c8f71fe860c00a3e74c003"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_members" DROP CONSTRAINT "FK_48b60c120c5dac01fe49d9be535"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_members" DROP CONSTRAINT "FK_2c840df5db52dc6b4a1b0b69c6e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications" DROP CONSTRAINT "FK_9a8a82462cab47c73d25f49261f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "submissions" DROP CONSTRAINT "FK_435def3bbd4b4bbb9de1209cdae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "submissions" DROP CONSTRAINT "FK_8723840b9b0464206640c268abc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assignments" DROP CONSTRAINT "FK_72635d29a69791901b423dfbd2a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assignments" DROP CONSTRAINT "FK_9a52a70c18d351ddab148eaf849"`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" DROP CONSTRAINT "FK_d933c06ab6d7ac8675f4803e1b5"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_comment_submission"`);
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a0cebd4894ed8e8372b5005a0f"`,
    );
    await queryRunner.query(`DROP TABLE "group_members"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_af08fad7c04bb85403970afdc1"`,
    );
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f043d0d459a667e9396e2a9086"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_189c1cab87a48d3795a6007a35"`,
    );
    await queryRunner.query(`DROP TABLE "submissions"`);
    await queryRunner.query(`DROP TYPE "public"."submissions_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."submissions_language_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_assignment_group"`);
    await queryRunner.query(`DROP TABLE "assignments"`);
    await queryRunner.query(`DROP TYPE "public"."assignments_language_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_group_invite_code"`);
    await queryRunner.query(`DROP TABLE "groups"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_user_email"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
