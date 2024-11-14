/*
  Warnings:

  - The primary key for the `Assignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Assignment` table. All the data in the column will be lost.
  - The primary key for the `Observation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Observation` table. All the data in the column will be lost.
  - The primary key for the `Occurrence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `observationId` on the `Occurrence` table. All the data in the column will be lost.
  - Added the required column `featureid` to the `Occurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `samp_name` to the `Occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_analysisId_fkey";

-- DropForeignKey
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_assay_name_fkey";

-- DropForeignKey
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_library_id_fkey";

-- DropForeignKey
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_project_id_fkey";

-- DropForeignKey
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_samp_name_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_observationId_fkey";

-- DropIndex
DROP INDEX "Observation_samp_name_featureid_key";

-- DropIndex
DROP INDEX "Occurrence_analysisId_observationId_key";

-- AlterTable
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Assignment_pkey" PRIMARY KEY ("analysisId", "featureid", "taxonomy");

-- AlterTable
ALTER TABLE "GenericData" ALTER COLUMN "assay_name" DROP NOT NULL,
ALTER COLUMN "library_id" DROP NOT NULL,
ALTER COLUMN "project_id" DROP NOT NULL,
ALTER COLUMN "samp_name" DROP NOT NULL,
ALTER COLUMN "analysisId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Observation" DROP CONSTRAINT "Observation_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Observation_pkey" PRIMARY KEY ("samp_name", "featureid");

-- AlterTable
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_pkey",
DROP COLUMN "id",
DROP COLUMN "observationId",
ADD COLUMN     "featureid" TEXT NOT NULL,
ADD COLUMN     "samp_name" TEXT NOT NULL,
ADD CONSTRAINT "Occurrence_pkey" PRIMARY KEY ("analysisId", "samp_name", "featureid");

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_samp_name_featureid_fkey" FOREIGN KEY ("samp_name", "featureid") REFERENCES "Observation"("samp_name", "featureid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Study"("project_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_samp_name_fkey" FOREIGN KEY ("samp_name") REFERENCES "Sample"("samp_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_assay_name_fkey" FOREIGN KEY ("assay_name") REFERENCES "Assay"("assay_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "Library"("library_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE SET NULL ON UPDATE CASCADE;
