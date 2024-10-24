/*
  Warnings:

  - You are about to drop the column `step1Id` on the `Step2_16S` table. All the data in the column will be lost.
  - You are about to drop the column `step1Id` on the `Step2_18S` table. All the data in the column will be lost.
  - You are about to drop the `Step1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Step1_Metadata` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[featureId]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sampleId` to the `Occurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateModified` to the `Run` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedBy` to the `Run` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SampleId` to the `Step2_16S` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SampleId` to the `Step2_18S` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Step1" DROP CONSTRAINT "Step1_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Step1" DROP CONSTRAINT "Step1_step1_MetadataId_fkey";

-- DropForeignKey
ALTER TABLE "Step2_16S" DROP CONSTRAINT "Step2_16S_step1Id_fkey";

-- DropForeignKey
ALTER TABLE "Step2_18S" DROP CONSTRAINT "Step2_18S_step1Id_fkey";

-- AlterTable
ALTER TABLE "Occurrence" ADD COLUMN     "sampleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Run" ADD COLUMN     "dateModified" TEXT NOT NULL,
ADD COLUMN     "uploadedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Step2_16S" DROP COLUMN "step1Id",
ADD COLUMN     "SampleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Step2_18S" DROP COLUMN "step1Id",
ADD COLUMN     "SampleId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Step1";

-- DropTable
DROP TABLE "Step1_Metadata";

-- CreateTable
CREATE TABLE "Sample_Metadata" (
    "id" TEXT NOT NULL,
    "nucl_acid_ext" TEXT,
    "nucl_acid_ext_kit" TEXT,
    "nucl_acid_ext_modify" TEXT,
    "precip_method_ext" TEXT,
    "dna_cleanup_0_1" TEXT,
    "dna_cleanup_method" TEXT,
    "concentration_method" TEXT,
    "seq_kit" TEXT,
    "lib_layout" TEXT NOT NULL,
    "adapter_forward" TEXT,
    "adapter_reverse" TEXT,
    "seq_facility" TEXT,
    "lib_screen" TEXT,
    "platform" TEXT NOT NULL,
    "instrument_model" TEXT NOT NULL,
    "seq_meth" TEXT,
    "seq_method_additional" TEXT,

    CONSTRAINT "Sample_Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sample" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "sample_name" TEXT NOT NULL,
    "sample_name_original" TEXT NOT NULL,
    "sample_type" "sample_type",
    "serial_number" TEXT,
    "cruise_id" TEXT,
    "line_id" TEXT,
    "station" TEXT,
    "locationID" TEXT,
    "habitat_natural_artificial_0_1" TEXT,
    "ctd_bottle_no" TEXT,
    "sample_replicate" TEXT,
    "source_material_id" TEXT,
    "biological_replicates" TEXT,
    "notes_sampling" TEXT,
    "verbatimEventDate" TEXT,
    "eventDate" TEXT NOT NULL,
    "minimumDepthInMeters" DOUBLE PRECISION,
    "maximumDepthInMeters" DOUBLE PRECISION,
    "env_broad_scale" TEXT NOT NULL,
    "env_local_scale" TEXT NOT NULL,
    "env_medium" TEXT NOT NULL,
    "geo_loc_name" TEXT NOT NULL,
    "waterBody" TEXT,
    "country" TEXT,
    "decimalLatitude" DOUBLE PRECISION,
    "decimalLongitude" DOUBLE PRECISION,
    "collection_method" TEXT,
    "samp_collect_device" TEXT,
    "samp_size" DOUBLE PRECISION,
    "samp_size_unit" TEXT,
    "extract_number" TEXT,
    "samp_mat_process" TEXT,
    "filter_passive_active_0_1" TEXT,
    "filter_onsite_dur" TEXT,
    "size_frac" TEXT,
    "samp_vol_we_dna_ext" TEXT,
    "samp_vol_ext_unit" DOUBLE PRECISION,
    "sample_title" TEXT,
    "bioproject_accession" TEXT,
    "biosample_accession" TEXT,
    "organism" TEXT NOT NULL,
    "description" TEXT,
    "amplicon_sequenced" TEXT,
    "metagenome_sequenced" TEXT,
    "sterilise_method" TEXT,
    "samp_store_dur" TEXT,
    "samp_store_loc" TEXT,
    "samp_store_temp" DOUBLE PRECISION,
    "samp_store_sol" TEXT,
    "sample_MetadataId" TEXT,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feature_featureId_key" ON "Feature"("featureId");

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_sample_MetadataId_fkey" FOREIGN KEY ("sample_MetadataId") REFERENCES "Sample_Metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step2_16S" ADD CONSTRAINT "Step2_16S_SampleId_fkey" FOREIGN KEY ("SampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step2_18S" ADD CONSTRAINT "Step2_18S_SampleId_fkey" FOREIGN KEY ("SampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
