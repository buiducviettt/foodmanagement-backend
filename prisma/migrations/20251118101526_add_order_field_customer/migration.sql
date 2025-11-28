/*
  Warnings:

  - Added the required column `customer` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `customer` VARCHAR(191) NOT NULL;
