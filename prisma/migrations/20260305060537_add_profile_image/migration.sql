-- AlterTable
ALTER TABLE `user` ADD COLUMN `profileImage` LONGBLOB NULL,
    ADD COLUMN `profileImageMime` VARCHAR(191) NULL;
