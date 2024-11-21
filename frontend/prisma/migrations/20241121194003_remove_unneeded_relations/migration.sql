/*
  Warnings:

  - You are about to drop the column `taxonomy` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the `_AnalysisToLibrary` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[analysisId,featureid]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[analysisId,samp_name,featureid]` on the table `Occurrence` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_analysisId_featureid_taxonomy_fkey";

-- DropForeignKey
ALTER TABLE "_AnalysisToLibrary" DROP CONSTRAINT "_AnalysisToLibrary_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnalysisToLibrary" DROP CONSTRAINT "_AnalysisToLibrary_B_fkey";

-- DropIndex
DROP INDEX "Assignment_analysisId_featureid_taxonomy_key";

-- DropIndex
DROP INDEX "Occurrence_analysisId_samp_name_featureid_taxonomy_key";

-- AlterTable
ALTER TABLE "Occurrence" DROP COLUMN "taxonomy";

-- DropTable
DROP TABLE "_AnalysisToLibrary";

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_analysisId_featureid_key" ON "Assignment"("analysisId", "featureid");

-- CreateIndex
CREATE UNIQUE INDEX "Occurrence_analysisId_samp_name_featureid_key" ON "Occurrence"("analysisId", "samp_name", "featureid");

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_analysisId_featureid_fkey" FOREIGN KEY ("analysisId", "featureid") REFERENCES "Assignment"("analysisId", "featureid") ON DELETE RESTRICT ON UPDATE CASCADE;
