/*
  Warnings:

  - A unique constraint covering the columns `[aoml_term]` on the table `Measurement_Metadata` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aoml_file` to the `Measurement_Metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aoml_term` to the `Measurement_Metadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Measurement_Metadata" ADD COLUMN     "aoml_file" TEXT NOT NULL,
ADD COLUMN     "aoml_term" TEXT NOT NULL,
ADD COLUMN     "measurementType" TEXT,
ADD COLUMN     "measurementTypeID" TEXT,
ADD COLUMN     "measurementUnit" TEXT,
ADD COLUMN     "measurementUnitID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Measurement_Metadata_aoml_term_key" ON "Measurement_Metadata"("aoml_term");
