-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
