/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `requirements` table. All the data in the column will be lost.
  - You are about to drop the column `is_compiled` on the `requirements` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `requirements` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `requirements` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[requirement]` on the table `Requirements` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `requirements` DROP FOREIGN KEY `Requirements_project_id_fkey`;

-- DropIndex
DROP INDEX `Requirements_project_id_idx` ON `requirements`;

-- AlterTable
ALTER TABLE `requirements` DROP COLUMN `deleted_at`,
    DROP COLUMN `is_compiled`,
    DROP COLUMN `project_id`,
    DROP COLUMN `remarks`;

-- CreateTable
CREATE TABLE `ProjectRequirements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `requirement_id` INTEGER NOT NULL,
    `is_compiled` BOOLEAN NOT NULL DEFAULT false,
    `remarks` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `ProjectRequirements_project_id_idx`(`project_id`),
    UNIQUE INDEX `ProjectRequirements_project_id_requirement_id_key`(`project_id`, `requirement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Requirements_requirement_key` ON `Requirements`(`requirement`);

-- AddForeignKey
ALTER TABLE `ProjectRequirements` ADD CONSTRAINT `ProjectRequirements_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectRequirements` ADD CONSTRAINT `ProjectRequirements_requirement_id_fkey` FOREIGN KEY (`requirement_id`) REFERENCES `Requirements`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
