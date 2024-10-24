/*
  Warnings:

  - You are about to drop the column `FeatureId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `TaxonomyId` on the `Assignment` table. All the data in the column will be lost.
  - The primary key for the `Feature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `FeatureId` on the `Occurrence` table. All the data in the column will be lost.
  - The primary key for the `Taxonomy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Taxonomy` table. All the data in the column will be lost.
  - Added the required column `featureId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxonomyId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `featureId` to the `Occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_FeatureId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_TaxonomyId_fkey";

-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_consensusTaxonomyId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_FeatureId_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "FeatureId",
DROP COLUMN "TaxonomyId",
ADD COLUMN     "featureId" TEXT NOT NULL,
ADD COLUMN     "taxonomyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_pkey",
DROP COLUMN "id",
ALTER COLUMN "consensusTaxonomyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Feature_pkey" PRIMARY KEY ("featureId");

-- AlterTable
ALTER TABLE "Occurrence" DROP COLUMN "FeatureId",
ADD COLUMN     "featureId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Taxonomy" DROP CONSTRAINT "Taxonomy_pkey",
DROP COLUMN "id";

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_consensusTaxonomyId_fkey" FOREIGN KEY ("consensusTaxonomyId") REFERENCES "Taxonomy"("stringIdentifier") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_taxonomyId_fkey" FOREIGN KEY ("taxonomyId") REFERENCES "Taxonomy"("stringIdentifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("featureId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("featureId") ON DELETE RESTRICT ON UPDATE CASCADE;
