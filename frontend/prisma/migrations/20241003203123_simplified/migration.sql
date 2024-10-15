/*
  Warnings:

  - You are about to drop the column `TaxonomyId` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `confidence` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `SampleMetadataId` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `Study_DataId` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `featureId` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `division` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `domain` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `subdivison` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `supergroup` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the `Amplicon_PrepData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Analysis_Data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BARCODE_prep_all_libraries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BARCODE_prep_per_library` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Measurement_Metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Metag_Individual_Data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Metag_Prep_Data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OtherData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SampleMetadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Study_Data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Water_Sample_Data` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sequence` to the `Feature` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Amplicon_PrepData" DROP CONSTRAINT "Amplicon_PrepData_Study_DataId_fkey";

-- DropForeignKey
ALTER TABLE "Analysis_Data" DROP CONSTRAINT "Analysis_Data_Study_DataId_fkey";

-- DropForeignKey
ALTER TABLE "BARCODE_prep_per_library" DROP CONSTRAINT "BARCODE_prep_per_library_BARCODE_prep_all_librariesId_fkey";

-- DropForeignKey
ALTER TABLE "BARCODE_prep_per_library" DROP CONSTRAINT "BARCODE_prep_per_library_Water_Sample_DataId_sample_name_fkey";

-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_TaxonomyId_fkey";

-- DropForeignKey
ALTER TABLE "Measurement_Metadata" DROP CONSTRAINT "Measurement_Metadata_Study_DataId_fkey";

-- DropForeignKey
ALTER TABLE "Metag_Individual_Data" DROP CONSTRAINT "Metag_Individual_Data_Water_Sample_DataId_sample_name_fkey";

-- DropForeignKey
ALTER TABLE "Metag_Prep_Data" DROP CONSTRAINT "Metag_Prep_Data_Study_DataId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_SampleMetadataId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_Study_DataId_fkey";

-- DropForeignKey
ALTER TABLE "OtherData" DROP CONSTRAINT "OtherData_SampleMetadataId_fkey";

-- DropForeignKey
ALTER TABLE "OtherData" DROP CONSTRAINT "OtherData_Water_Sample_DataId_fkey";

-- DropForeignKey
ALTER TABLE "Water_Sample_Data" DROP CONSTRAINT "Water_Sample_Data_Study_DataId_fkey";

-- DropIndex
DROP INDEX "Feature_featureId_key";

-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "TaxonomyId",
DROP COLUMN "confidence",
ADD COLUMN     "consensusTaxonomyId" TEXT,
ADD COLUMN     "sequence" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Occurrence" DROP COLUMN "SampleMetadataId",
DROP COLUMN "Study_DataId",
DROP COLUMN "featureId";

-- AlterTable
ALTER TABLE "Taxonomy" DROP COLUMN "division",
DROP COLUMN "domain",
DROP COLUMN "subdivison",
DROP COLUMN "supergroup";

-- DropTable
DROP TABLE "Amplicon_PrepData";

-- DropTable
DROP TABLE "Analysis_Data";

-- DropTable
DROP TABLE "BARCODE_prep_all_libraries";

-- DropTable
DROP TABLE "BARCODE_prep_per_library";

-- DropTable
DROP TABLE "Measurement_Metadata";

-- DropTable
DROP TABLE "Metag_Individual_Data";

-- DropTable
DROP TABLE "Metag_Prep_Data";

-- DropTable
DROP TABLE "OtherData";

-- DropTable
DROP TABLE "SampleMetadata";

-- DropTable
DROP TABLE "Study_Data";

-- DropTable
DROP TABLE "Water_Sample_Data";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "project_id_external" TEXT NOT NULL,
    "project_id_internal" TEXT,
    "projectContact" TEXT NOT NULL,
    "projectContactID" TEXT,
    "project_description" TEXT NOT NULL,
    "study_area_description" TEXT,
    "sampling_description" TEXT,
    "keywords" TEXT,
    "grant_number" INTEGER,
    "grant_title" TEXT,
    "grant_agency" TEXT,
    "recordedBy" TEXT,
    "recordedByID" TEXT,
    "institution" TEXT,
    "institutionID" TEXT,
    "associated_parties" TEXT,
    "license" TEXT NOT NULL,
    "rightsHolder" TEXT,
    "accessRights" TEXT,
    "informationWithheld" TEXT,
    "dataGeneralizations" TEXT,
    "bibliographicCitation" TEXT,
    "associated_resource" TEXT,
    "experimental_factor" TEXT,
    "detection_type" TEXT,
    "citation" TEXT,
    "project_proposal" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step1_Metadata" (
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

    CONSTRAINT "Step1_Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step1" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "step1_MetadataId" TEXT NOT NULL,
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

    CONSTRAINT "Step1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step2_Metadata" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Step2_Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step2_16S" (
    "id" TEXT NOT NULL,
    "step1Id" TEXT NOT NULL,

    CONSTRAINT "Step2_16S_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step2_18S" (
    "id" TEXT NOT NULL,
    "step1Id" TEXT NOT NULL,

    CONSTRAINT "Step2_18S_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bioinformatics" (
    "id" TEXT NOT NULL,
    "step2_18SId" TEXT,
    "step2_16SId" TEXT,

    CONSTRAINT "Bioinformatics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL,
    "date_modified" TIMESTAMP(3) NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "aoml_term" TEXT NOT NULL,
    "aoml_file" TEXT NOT NULL,
    "measurementType" TEXT,
    "measurementUnit" TEXT,
    "measurementTypeID" TEXT,
    "measurementUnitID" TEXT,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Run" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "TaxonomyId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenericData" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "GenericData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Measurement_aoml_term_key" ON "Measurement"("aoml_term");

-- AddForeignKey
ALTER TABLE "Step1" ADD CONSTRAINT "Step1_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step1" ADD CONSTRAINT "Step1_step1_MetadataId_fkey" FOREIGN KEY ("step1_MetadataId") REFERENCES "Step1_Metadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step2_16S" ADD CONSTRAINT "Step2_16S_step1Id_fkey" FOREIGN KEY ("step1Id") REFERENCES "Step1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step2_18S" ADD CONSTRAINT "Step2_18S_step1Id_fkey" FOREIGN KEY ("step1Id") REFERENCES "Step1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bioinformatics" ADD CONSTRAINT "Bioinformatics_step2_18SId_fkey" FOREIGN KEY ("step2_18SId") REFERENCES "Step2_18S"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bioinformatics" ADD CONSTRAINT "Bioinformatics_step2_16SId_fkey" FOREIGN KEY ("step2_16SId") REFERENCES "Step2_16S"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_consensusTaxonomyId_fkey" FOREIGN KEY ("consensusTaxonomyId") REFERENCES "Taxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_TaxonomyId_fkey" FOREIGN KEY ("TaxonomyId") REFERENCES "Taxonomy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
