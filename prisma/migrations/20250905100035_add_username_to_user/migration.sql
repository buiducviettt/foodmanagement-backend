/*
  Warnings:

  - You are about to drop the column `product_id` on the `cart_items` table. All the data in the column will be lost.
  - Added the required column `productId` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart_items` DROP COLUMN `product_id`,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `username` VARCHAR(191) NULL;
