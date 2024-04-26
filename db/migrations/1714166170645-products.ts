import { MigrationInterface, QueryRunner } from "typeorm";

export class Products1714166170645 implements MigrationInterface {
    name = 'Products1714166170645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text DEFAULT '', "quantity" integer NOT NULL DEFAULT '0', "price" numeric(5,2) NOT NULL DEFAULT '0', CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
