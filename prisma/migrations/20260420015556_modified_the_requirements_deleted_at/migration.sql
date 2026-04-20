-- AlterTable
ALTER TABLE `projectrequirements` ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `requirements` ADD COLUMN `deleted_at` DATETIME(3) NULL;
