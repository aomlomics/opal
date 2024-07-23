/*
  Warnings:

  - You are about to drop the column `FeatureId` on the `Occurrence` table. All the data in the column will be lost.
  - Added the required column `Feature` to the `Occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_FeatureId_fkey";

-- AlterTable
ALTER TABLE "Occurrence" DROP COLUMN "FeatureId",
ADD COLUMN     "Feature" TEXT NOT NULL,
ADD COLUMN     "featureId" TEXT;
