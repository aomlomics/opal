/*
  Warnings:

  - You are about to drop the column `aplicon_sequenced` on the `Water_Sample_Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Water_Sample_Data" DROP COLUMN "aplicon_sequenced",
ADD COLUMN     "amplicon_sequenced" TEXT;
