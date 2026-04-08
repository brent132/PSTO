-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NULL,
    `suffix` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `profileImage` LONGBLOB NULL,
    `profileImageMime` VARCHAR(191) NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_code` VARCHAR(191) NOT NULL,
    `project_name` VARCHAR(191) NOT NULL,
    `fiscal_year` VARCHAR(191) NULL,
    `budget` DOUBLE NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `manager_name` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Projects_project_code_key`(`project_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_date` DATETIME(3) NOT NULL,
    `project_code` VARCHAR(191) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `voucher_no` VARCHAR(191) NOT NULL,
    `particulars` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `transaction_type` VARCHAR(191) NOT NULL,
    `created_by` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fiscal_year` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `type` ENUM('PROJECT_CREATED', 'PROJECT_UPDATED', 'PROJECT_STATUS_CHANGED', 'TRANSACTION_CREATED', 'TRANSACTION_UPDATED', 'TRANSACTION_APPROVED', 'TRANSACTION_REJECTED', 'BUDGET_WARNING', 'DEADLINE_WARNING', 'SYSTEM') NOT NULL,
    `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'MEDIUM',
    `created_by` INTEGER NULL,
    `reference_type` ENUM('PROJECT', 'TRANSACTION', 'REPORT', 'CATEGORY', 'SYSTEM') NULL,
    `reference_id` INTEGER NULL,
    `action_url` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `notifications_created_by_idx`(`created_by`),
    INDEX `notifications_type_idx`(`type`),
    INDEX `notifications_priority_idx`(`priority`),
    INDEX `notifications_reference_type_reference_id_idx`(`reference_type`, `reference_id`),
    INDEX `notifications_created_at_idx`(`created_at`),
    INDEX `notifications_deleted_at_idx`(`deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification_recipients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notification_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `read_at` DATETIME(3) NULL,
    `is_hidden` BOOLEAN NOT NULL DEFAULT false,
    `delivered_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    INDEX `notification_recipients_user_id_is_read_idx`(`user_id`, `is_read`),
    INDEX `notification_recipients_user_id_delivered_at_idx`(`user_id`, `delivered_at`),
    INDEX `notification_recipients_notification_id_idx`(`notification_id`),
    INDEX `notification_recipients_deleted_at_idx`(`deleted_at`),
    UNIQUE INDEX `notification_recipients_notification_id_user_id_key`(`notification_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_project_code_fkey` FOREIGN KEY (`project_code`) REFERENCES `Projects`(`project_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification_recipients` ADD CONSTRAINT `notification_recipients_notification_id_fkey` FOREIGN KEY (`notification_id`) REFERENCES `notifications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification_recipients` ADD CONSTRAINT `notification_recipients_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
