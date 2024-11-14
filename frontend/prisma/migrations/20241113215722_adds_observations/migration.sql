/*
  Warnings:

  - You are about to drop the column `featureid` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `samp_name` on the `Occurrence` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[analysisId,observationId]` on the table `Occurrence` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `observationId` to the `Occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_featureid_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_samp_name_fkey";

-- AlterTable
ALTER TABLE "Occurrence" DROP COLUMN "featureid",
DROP COLUMN "samp_name",
ADD COLUMN     "observationId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Observation" (
    "id" TEXT NOT NULL,
    "samp_name" TEXT NOT NULL,
    "featureid" TEXT NOT NULL,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Observation_samp_name_featureid_key" ON "Observation"("samp_name", "featureid");

-- CreateIndex
CREATE UNIQUE INDEX "Occurrence_analysisId_observationId_key" ON "Occurrence"("analysisId", "observationId");

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_samp_name_fkey" FOREIGN KEY ("samp_name") REFERENCES "Sample"("samp_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_featureid_fkey" FOREIGN KEY ("featureid") REFERENCES "Feature"("featureid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_observationId_fkey" FOREIGN KEY ("observationId") REFERENCES "Observation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
