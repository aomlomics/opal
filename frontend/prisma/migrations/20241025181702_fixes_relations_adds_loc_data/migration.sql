/*
  Warnings:

  - You are about to drop the column `sampleId` on the `Marker` table. All the data in the column will be lost.
  - You are about to drop the column `dateModified` on the `Run` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedBy` on the `Run` table. All the data in the column will be lost.
  - Added the required column `sampleId` to the `Occurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `decimalLatitude` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `decimalLongitude` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `markerId` to the `Sample` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Marker" DROP CONSTRAINT "Marker_sampleId_fkey";

-- AlterTable
ALTER TABLE "Marker" DROP COLUMN "sampleId";

-- AlterTable
ALTER TABLE "Occurrence" ADD COLUMN     "sampleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Run" DROP COLUMN "dateModified",
DROP COLUMN "uploadedBy";

-- AlterTable
ALTER TABLE "Sample" ADD COLUMN     "decimalLatitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "decimalLongitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "markerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_markerId_fkey" FOREIGN KEY ("markerId") REFERENCES "Marker"("assay_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("samp_name") ON DELETE RESTRICT ON UPDATE CASCADE;
