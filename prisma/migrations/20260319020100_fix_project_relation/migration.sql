/*
  Warnings:

  - You are about to alter the column `created_by` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[project_code]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `transactions` MODIFY `created_by` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Projects_project_code_key` ON `Projects`(`project_code`);

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_project_code_fkey` FOREIGN KEY (`project_code`) REFERENCES `Projects`(`project_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
