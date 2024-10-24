/*
  Warnings:

  - You are about to drop the column `featureId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `runId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `step2_16SId` on the `Bioinformatics` table. All the data in the column will be lost.
  - You are about to drop the column `step2_18SId` on the `Bioinformatics` table. All the data in the column will be lost.
  - You are about to drop the column `Feature` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `sampleId` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the `Step2_16S` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Step2_18S` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Step2_Metadata` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `FeatureId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FeatureId` to the `Occurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SampleId` to the `Occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_featureId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_runId_fkey";

-- DropForeignKey
ALTER TABLE "Bioinformatics" DROP CONSTRAINT "Bioinformatics_step2_16SId_fkey";

-- DropForeignKey
ALTER TABLE "Bioinformatics" DROP CONSTRAINT "Bioinformatics_step2_18SId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_sampleId_fkey";

-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Step2_16S" DROP CONSTRAINT "Step2_16S_SampleId_fkey";

-- DropForeignKey
ALTER TABLE "Step2_18S" DROP CONSTRAINT "Step2_18S_SampleId_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "featureId",
DROP COLUMN "runId",
ADD COLUMN     "FeatureId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Bioinformatics" DROP COLUMN "step2_16SId",
DROP COLUMN "step2_18SId",
ADD COLUMN     "Marker_16SId" TEXT,
ADD COLUMN     "Marker_18SId" TEXT;

-- AlterTable
ALTER TABLE "Occurrence" DROP COLUMN "Feature",
DROP COLUMN "sampleId",
ADD COLUMN     "FeatureId" TEXT NOT NULL,
ADD COLUMN     "SampleId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Step2_16S";

-- DropTable
DROP TABLE "Step2_18S";

-- DropTable
DROP TABLE "Step2_Metadata";

-- CreateTable
CREATE TABLE "Marker_Metadata" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Marker_Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marker_16S" (
    "id" TEXT NOT NULL,
    "SampleId" TEXT NOT NULL,

    CONSTRAINT "Marker_16S_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marker_18S" (
    "id" TEXT NOT NULL,
    "SampleId" TEXT NOT NULL,

    CONSTRAINT "Marker_18S_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToRun" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OccurrenceToRun" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToRun_AB_unique" ON "_ProjectToRun"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToRun_B_index" ON "_ProjectToRun"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OccurrenceToRun_AB_unique" ON "_OccurrenceToRun"("A", "B");

-- CreateIndex
CREATE INDEX "_OccurrenceToRun_B_index" ON "_OccurrenceToRun"("B");

-- AddForeignKey
ALTER TABLE "Marker_16S" ADD CONSTRAINT "Marker_16S_SampleId_fkey" FOREIGN KEY ("SampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marker_18S" ADD CONSTRAINT "Marker_18S_SampleId_fkey" FOREIGN KEY ("SampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bioinformatics" ADD CONSTRAINT "Bioinformatics_Marker_18SId_fkey" FOREIGN KEY ("Marker_18SId") REFERENCES "Marker_18S"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bioinformatics" ADD CONSTRAINT "Bioinformatics_Marker_16SId_fkey" FOREIGN KEY ("Marker_16SId") REFERENCES "Marker_16S"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_FeatureId_fkey" FOREIGN KEY ("FeatureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_FeatureId_fkey" FOREIGN KEY ("FeatureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_SampleId_fkey" FOREIGN KEY ("SampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToRun" ADD CONSTRAINT "_ProjectToRun_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToRun" ADD CONSTRAINT "_ProjectToRun_B_fkey" FOREIGN KEY ("B") REFERENCES "Run"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OccurrenceToRun" ADD CONSTRAINT "_OccurrenceToRun_A_fkey" FOREIGN KEY ("A") REFERENCES "Occurrence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OccurrenceToRun" ADD CONSTRAINT "_OccurrenceToRun_B_fkey" FOREIGN KEY ("B") REFERENCES "Run"("id") ON DELETE CASCADE ON UPDATE CASCADE;
