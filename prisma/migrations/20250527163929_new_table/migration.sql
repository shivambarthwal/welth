/*
  Warnings:

  - You are about to drop the column `descriptiion` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "descriptiion",
ADD COLUMN     "description" TEXT;
