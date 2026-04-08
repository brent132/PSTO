/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification_recipients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `notification_recipients` DROP FOREIGN KEY `notification_recipients_notification_id_fkey`;

-- DropForeignKey
ALTER TABLE `notification_recipients` DROP FOREIGN KEY `notification_recipients_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_project_code_fkey`;

-- DropTable
DROP TABLE `categories`;

-- DropTable
DROP TABLE `notification_recipients`;

-- DropTable
DROP TABLE `notifications`;

-- DropTable
DROP TABLE `projects`;

-- DropTable
DROP TABLE `transactions`;
