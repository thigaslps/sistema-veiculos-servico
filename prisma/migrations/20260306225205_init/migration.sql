/*
  Warnings:

  - Made the column `value` on table `vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `vehicle` MODIFY `value` DECIMAL(15, 2) NOT NULL;

-- AlterTable
ALTER TABLE `vehicle_photos` MODIFY `url` LONGTEXT NOT NULL;
