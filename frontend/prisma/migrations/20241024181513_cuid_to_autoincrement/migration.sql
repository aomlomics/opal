/*
  Warnings:

  - The primary key for the `Assignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Assignment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Bioinformatics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Bioinformatics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `Marker_16SId` column on the `Bioinformatics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `Marker_18SId` column on the `Bioinformatics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Feature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Feature` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `consensusTaxonomyId` column on the `Feature` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `GenericData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GenericData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Marker_16S` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Marker_16S` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Marker_18S` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Marker_18S` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Marker_Metadata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Marker_Metadata` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Occurrence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Occurrence` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Sample` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sample_MetadataId` on the `Sample` table. All the data in the column will be lost.
  - The `id` column on the `Sample` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Sample_Metadata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Sample_Metadata` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Taxonomy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Taxonomy` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `TaxonomyId` on the `Assignment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `FeatureId` on the `Assignment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `SampleId` on the `Marker_16S` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `SampleId` on the `Marker_18S` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `FeatureId` on the `Occurrence` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `SampleId` on the `Occurrence` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_OccurrenceToRun` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_ProjectToRun` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_FeatureId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_TaxonomyId_fkey";

-- DropForeignKey
ALTER TABLE "Bioinformatics" DROP CONSTRAINT "Bioinformatics_Marker_16SId_fkey";

-- DropForeignKey
ALTER TABLE "Bioinformatics" DROP CONSTRAINT "Bioinformatics_Marker_18SId_fkey";

-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_consensusTaxonomyId_fkey";

-- DropForeignKey
ALTER TABLE "Marker_16S" DROP CONSTRAINT "Marker_16S_SampleId_fkey";

-- DropForeignKey
ALTER TABLE "Marker_18S" DROP CONSTRAINT "Marker_18S_SampleId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_FeatureId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_SampleId_fkey";

-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_sample_MetadataId_fkey";

-- DropForeignKey
ALTER TABLE "_OccurrenceToRun" DROP CONSTRAINT "_OccurrenceToRun_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToRun" DROP CONSTRAINT "_ProjectToRun_A_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "TaxonomyId",
ADD COLUMN     "TaxonomyId" INTEGER NOT NULL,
DROP COLUMN "FeatureId",
ADD COLUMN     "FeatureId" INTEGER NOT NULL,
ADD CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Bioinformatics" DROP CONSTRAINT "Bioinformatics_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "Marker_16SId",
ADD COLUMN     "Marker_16SId" INTEGER,
DROP COLUMN "Marker_18SId",
ADD COLUMN     "Marker_18SId" INTEGER,
ADD CONSTRAINT "Bioinformatics_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "consensusTaxonomyId",
ADD COLUMN     "consensusTaxonomyId" INTEGER,
ADD CONSTRAINT "Feature_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "GenericData_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Marker_16S" DROP CONSTRAINT "Marker_16S_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "SampleId",
ADD COLUMN     "SampleId" INTEGER NOT NULL,
ADD CONSTRAINT "Marker_16S_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Marker_18S" DROP CONSTRAINT "Marker_18S_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "SampleId",
ADD COLUMN     "SampleId" INTEGER NOT NULL,
ADD CONSTRAINT "Marker_18S_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Marker_Metadata" DROP CONSTRAINT "Marker_Metadata_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Marker_Metadata_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "FeatureId",
ADD COLUMN     "FeatureId" INTEGER NOT NULL,
DROP COLUMN "SampleId",
ADD COLUMN     "SampleId" INTEGER NOT NULL,
ADD CONSTRAINT "Occurrence_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_pkey",
DROP COLUMN "sample_MetadataId",
ADD COLUMN     "Sample_MetadataId" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Sample_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Sample_Metadata" DROP CONSTRAINT "Sample_Metadata_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Sample_Metadata_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Taxonomy" DROP CONSTRAINT "Taxonomy_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Taxonomy_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_OccurrenceToRun" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_ProjectToRun" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_OccurrenceToRun_AB_unique" ON "_OccurrenceToRun"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToRun_AB_unique" ON "_ProjectToRun"("A", "B");

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_Sample_MetadataId_fkey" FOREIGN KEY ("Sample_MetadataId") REFERENCES "Sample_Metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marker_16S" ADD CONSTRAINT "Marker_16S_SampleId_fkey" FOREIGN KEY ("SampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marker_18S" ADD CONSTRAINT "Marker_18S_SampleId_fkey" FOREIGN KEY ("SampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bioinformatics" ADD CONSTRAINT "Bioinformatics_Marker_18SId_fkey" FOREIGN KEY ("Marker_18SId") REFERENCES "Marker_18S"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bioinformatics" ADD CONSTRAINT "Bioinformatics_Marker_16SId_fkey" FOREIGN KEY ("Marker_16SId") REFERENCES "Marker_16S"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_consensusTaxonomyId_fkey" FOREIGN KEY ("consensusTaxonomyId") REFERENCES "Taxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_TaxonomyId_fkey" FOREIGN KEY ("TaxonomyId") REFERENCES "Taxonomy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_FeatureId_fkey" FOREIGN KEY ("FeatureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_FeatureId_fkey" FOREIGN KEY ("FeatureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_SampleId_fkey" FOREIGN KEY ("SampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToRun" ADD CONSTRAINT "_ProjectToRun_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OccurrenceToRun" ADD CONSTRAINT "_OccurrenceToRun_A_fkey" FOREIGN KEY ("A") REFERENCES "Occurrence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
