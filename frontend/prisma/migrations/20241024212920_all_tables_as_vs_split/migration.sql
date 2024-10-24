/*
  Warnings:

  - The primary key for the `Feature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `featureId` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `SampleId` on the `Occurrence` table. All the data in the column will be lost.
  - The primary key for the `Run` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Run` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Sample` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Sample_MetadataId` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `amplicon_sequenced` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `biological_replicates` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `bioproject_accession` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `biosample_accession` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `collection_method` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `cruise_id` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `ctd_bottle_no` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `decimalLatitude` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `decimalLongitude` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `env_broad_scale` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `env_local_scale` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `env_medium` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `eventDate` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `extract_number` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `filter_onsite_dur` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `filter_passive_active_0_1` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `geo_loc_name` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `habitat_natural_artificial_0_1` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `line_id` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `locationID` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `maximumDepthInMeters` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `metagenome_sequenced` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `minimumDepthInMeters` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `notes_sampling` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `organism` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `samp_collect_device` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `samp_mat_process` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `samp_size` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `samp_size_unit` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `samp_store_dur` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `samp_store_loc` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `samp_store_sol` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `samp_store_temp` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `samp_vol_ext_unit` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `samp_vol_we_dna_ext` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `sample_name` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `sample_name_original` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `sample_replicate` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `sample_title` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `sample_type` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `serial_number` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `size_frac` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `source_material_id` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `station` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `sterilise_method` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `verbatimEventDate` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `waterBody` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the `Bioinformatics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Marker_16S` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Marker_18S` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Marker_Metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Measurement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sample_Metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OccurrenceToRun` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToRun` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[seq_id]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[samp_name]` on the table `Sample` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seq_id` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `libraryId` to the `Run` table without a default value. This is not possible if the table is not empty.
  - Added the required column `samp_name` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studyId` to the `Sample` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_featureId_fkey";

-- DropForeignKey
ALTER TABLE "Bioinformatics" DROP CONSTRAINT "Bioinformatics_Marker_16SId_fkey";

-- DropForeignKey
ALTER TABLE "Bioinformatics" DROP CONSTRAINT "Bioinformatics_Marker_18SId_fkey";

-- DropForeignKey
ALTER TABLE "Marker_16S" DROP CONSTRAINT "Marker_16S_SampleId_fkey";

-- DropForeignKey
ALTER TABLE "Marker_18S" DROP CONSTRAINT "Marker_18S_SampleId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_SampleId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_featureId_fkey";

-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_Sample_MetadataId_fkey";

-- DropForeignKey
ALTER TABLE "_OccurrenceToRun" DROP CONSTRAINT "_OccurrenceToRun_A_fkey";

-- DropForeignKey
ALTER TABLE "_OccurrenceToRun" DROP CONSTRAINT "_OccurrenceToRun_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToRun" DROP CONSTRAINT "_ProjectToRun_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToRun" DROP CONSTRAINT "_ProjectToRun_B_fkey";

-- DropIndex
DROP INDEX "Feature_featureId_key";

-- AlterTable
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_pkey",
DROP COLUMN "featureId",
ADD COLUMN     "seq_id" TEXT NOT NULL,
ADD CONSTRAINT "Feature_pkey" PRIMARY KEY ("seq_id");

-- AlterTable
ALTER TABLE "Occurrence" DROP COLUMN "SampleId",
ADD COLUMN     "runId" INTEGER;

-- AlterTable
ALTER TABLE "Run" DROP CONSTRAINT "Run_pkey",
ADD COLUMN     "libraryId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Run_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_pkey",
DROP COLUMN "Sample_MetadataId",
DROP COLUMN "amplicon_sequenced",
DROP COLUMN "biological_replicates",
DROP COLUMN "bioproject_accession",
DROP COLUMN "biosample_accession",
DROP COLUMN "collection_method",
DROP COLUMN "country",
DROP COLUMN "cruise_id",
DROP COLUMN "ctd_bottle_no",
DROP COLUMN "decimalLatitude",
DROP COLUMN "decimalLongitude",
DROP COLUMN "description",
DROP COLUMN "env_broad_scale",
DROP COLUMN "env_local_scale",
DROP COLUMN "env_medium",
DROP COLUMN "eventDate",
DROP COLUMN "extract_number",
DROP COLUMN "filter_onsite_dur",
DROP COLUMN "filter_passive_active_0_1",
DROP COLUMN "geo_loc_name",
DROP COLUMN "habitat_natural_artificial_0_1",
DROP COLUMN "id",
DROP COLUMN "line_id",
DROP COLUMN "locationID",
DROP COLUMN "maximumDepthInMeters",
DROP COLUMN "metagenome_sequenced",
DROP COLUMN "minimumDepthInMeters",
DROP COLUMN "notes_sampling",
DROP COLUMN "organism",
DROP COLUMN "projectId",
DROP COLUMN "samp_collect_device",
DROP COLUMN "samp_mat_process",
DROP COLUMN "samp_size",
DROP COLUMN "samp_size_unit",
DROP COLUMN "samp_store_dur",
DROP COLUMN "samp_store_loc",
DROP COLUMN "samp_store_sol",
DROP COLUMN "samp_store_temp",
DROP COLUMN "samp_vol_ext_unit",
DROP COLUMN "samp_vol_we_dna_ext",
DROP COLUMN "sample_name",
DROP COLUMN "sample_name_original",
DROP COLUMN "sample_replicate",
DROP COLUMN "sample_title",
DROP COLUMN "sample_type",
DROP COLUMN "serial_number",
DROP COLUMN "size_frac",
DROP COLUMN "source_material_id",
DROP COLUMN "station",
DROP COLUMN "sterilise_method",
DROP COLUMN "verbatimEventDate",
DROP COLUMN "waterBody",
ADD COLUMN     "samp_name" TEXT NOT NULL,
ADD COLUMN     "studyId" TEXT NOT NULL,
ADD CONSTRAINT "Sample_pkey" PRIMARY KEY ("samp_name");

-- AlterTable
ALTER TABLE "Taxonomy" ADD CONSTRAINT "Taxonomy_pkey" PRIMARY KEY ("stringIdentifier");

-- DropTable
DROP TABLE "Bioinformatics";

-- DropTable
DROP TABLE "Marker_16S";

-- DropTable
DROP TABLE "Marker_18S";

-- DropTable
DROP TABLE "Marker_Metadata";

-- DropTable
DROP TABLE "Measurement";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Sample_Metadata";

-- DropTable
DROP TABLE "_OccurrenceToRun";

-- DropTable
DROP TABLE "_ProjectToRun";

-- DropEnum
DROP TYPE "depth_category";

-- DropEnum
DROP TYPE "filetype";

-- DropEnum
DROP TYPE "instrument_model";

-- DropEnum
DROP TYPE "lib_layout";

-- DropEnum
DROP TYPE "library_selection";

-- DropEnum
DROP TYPE "library_source";

-- DropEnum
DROP TYPE "library_strategy";

-- DropEnum
DROP TYPE "oxy_stat_samp";

-- DropEnum
DROP TYPE "plate";

-- DropEnum
DROP TYPE "platform";

-- DropEnum
DROP TYPE "rel_to_oxy";

-- DropEnum
DROP TYPE "replicate";

-- DropEnum
DROP TYPE "sample_collection_device";

-- DropEnum
DROP TYPE "sample_collection_method";

-- DropEnum
DROP TYPE "sample_type";

-- DropEnum
DROP TYPE "target_gene";

-- DropEnum
DROP TYPE "tidal_stage";

-- CreateTable
CREATE TABLE "Study" (
    "project_id" TEXT NOT NULL,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "Marker" (
    "assay_name" TEXT NOT NULL,
    "sampleId" TEXT NOT NULL,

    CONSTRAINT "Marker_pkey" PRIMARY KEY ("assay_name")
);

-- CreateTable
CREATE TABLE "Library" (
    "library_id" TEXT NOT NULL,
    "markerId" TEXT NOT NULL,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("library_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Study_project_id_key" ON "Study"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "Marker_assay_name_key" ON "Marker"("assay_name");

-- CreateIndex
CREATE UNIQUE INDEX "Library_library_id_key" ON "Library"("library_id");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_seq_id_key" ON "Feature"("seq_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sample_samp_name_key" ON "Sample"("samp_name");

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marker" ADD CONSTRAINT "Marker_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("samp_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_markerId_fkey" FOREIGN KEY ("markerId") REFERENCES "Marker"("assay_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("library_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("seq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("seq_id") ON DELETE RESTRICT ON UPDATE CASCADE;
