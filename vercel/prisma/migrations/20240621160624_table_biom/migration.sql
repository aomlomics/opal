/*
  Warnings:

  - The `sample_type` column on the `Water_Sample_Data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `oxy_stat_samp` column on the `Water_Sample_Data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rel_to_oxygen` column on the `Water_Sample_Data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tidal_stage` column on the `Water_Sample_Data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `library_strategy` on the `Amplicon_PrepData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `library_source` on the `Amplicon_PrepData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `library_selection` on the `Amplicon_PrepData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `lib_layout` on the `Amplicon_PrepData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `filetype` on the `Amplicon_PrepData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `library_strategy` on the `Metag_Prep_Data` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `library_source` on the `Metag_Prep_Data` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `library_selection` on the `Metag_Prep_Data` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `lib_layout` on the `Metag_Prep_Data` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `filetype` on the `Metag_Prep_Data` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "sample_type" AS ENUM ('seawater', 'sediment', 'extraction blank', 'distilled water blank', 'RTSF blank', 'mock community', 'positive control', 'PCR no-template control', 'bead cleanup blank', 'mock', 'pcr_blank');

-- CreateEnum
CREATE TYPE "oxy_stat_samp" AS ENUM ('aerobic', 'anaerobic');

-- CreateEnum
CREATE TYPE "rel_to_oxy" AS ENUM ('aerobe', 'anaerobe', 'facultative', 'microaerophilic', 'microanaerobe', 'obligate aerobe', 'obligate anaerobe', 'missing', 'not applicable', 'not collected', 'not provided', 'restricted access');

-- CreateEnum
CREATE TYPE "tidal_stage" AS ENUM ('low', 'high');

-- CreateEnum
CREATE TYPE "library_strategy" AS ENUM ('wga', 'wgs', 'wxs', 'RNA-Seq', 'miRNA-Seq', 'wcs', 'clone', 'poolclone', 'amplicon', 'cloneend', 'finishing', 'ChIP-Seq', 'MNase-Seq', 'DNase-Hypersensitivity', 'Bisulfite-Seq', 'Tn-Seq', 'est', 'FL-cDNA', 'cts', 'MRE-Seq', 'MeDIP-Seq', 'MDB-Seq', 'Synthetic-Long-Read', 'ATAC-seq', 'ChIA-PET', 'FAIRE-seq', 'Hi-C', 'ncRNA-Seq', 'RAD-Seq', 'RIP-Seq', 'selex', 'ssRNA_seq', 'Targeted-Capture', 'Tethered Chromatin Conformation Capture', 'other');

-- CreateEnum
CREATE TYPE "library_source" AS ENUM ('genomic', 'transcriptomic', 'metagenomic', 'metatranscriptomic', 'synthetic', 'VIRAL RNA', 'GENOMIC SINGLE CELL', 'TRANSCRIPTOMIC SINGLE CELL', 'other');

-- CreateEnum
CREATE TYPE "library_selection" AS ENUM ('random', 'pcr', 'RANDOM PCR', 'RT-PCR', 'hmpr', 'mf', 'CF-S', 'CF-M', 'CF-H', 'CF-T', 'mda', 'msll', 'cdna', 'chip', 'mnase', 'dnase', 'Hybrid Selection', 'Reduced Representation', 'Restriction Digest', '5-methylcytidine antibody', 'MBD2 protein methyl-CpG binding domain', 'cage', 'race', 'size fractionation', 'Padlock probes capture method', 'other', 'unspecified', 'cnda_oligo_dt', 'cdna_randomprinting', 'Inverse rRNA', 'Oligo-dT', 'polya', 'repeat fractionation');

-- CreateEnum
CREATE TYPE "lib_layout" AS ENUM ('paired', 'single');

-- CreateEnum
CREATE TYPE "platform" AS ENUM ('_LS454', 'abi_solid', 'bgiseq', 'capillary', 'complete_genomics', 'helicos', 'illumina', 'ion_torrent', 'oxford_nanopore', 'pacbio_smrt');

-- CreateEnum
CREATE TYPE "instrument_model" AS ENUM ('BGISEQ-500', 'DNBSEQ-G400', 'DNBSEQ-T7', 'DNBSEQ-G50', 'MGISEQ-2000RS');

-- CreateEnum
CREATE TYPE "filetype" AS ENUM ('bam', 'srf', 'sff', 'fastq', '454_native', 'helicos_native', 'solid_native', 'pacbio_hdf5', 'completegenomics_native', 'oxfordnanopore_native');

-- CreateEnum
CREATE TYPE "replicate" AS ENUM ('a', 'b', 'c');

-- CreateEnum
CREATE TYPE "depth_category" AS ENUM ('dcm', 'deep', 'diw', 'sediment', 'surface');

-- CreateEnum
CREATE TYPE "sample_collection_device" AS ENUM ('Extraction filter', 'MilliQ carboy', 'Niskin bottle', 'PCR negative control', 'Positive control (16S)', 'Sediment core (aqueous layer)');

-- CreateEnum
CREATE TYPE "sample_collection_method" AS ENUM ('CTD rosette', 'Extraction filter', 'MilliQ carboy', 'PCR negative control', 'Positive control (16S)', 'Sediment core (aqueous layer)');

-- CreateEnum
CREATE TYPE "plate" AS ENUM ('plate1', 'plate2', 'plate3', 'plate4', 'plate5', 'plate6');

-- CreateEnum
CREATE TYPE "target_gene" AS ENUM ('{16S rRNA, 18S rRNA}');

-- AlterTable
ALTER TABLE "Amplicon_PrepData" DROP COLUMN "library_strategy",
ADD COLUMN     "library_strategy" "library_strategy" NOT NULL,
DROP COLUMN "library_source",
ADD COLUMN     "library_source" "library_source" NOT NULL,
DROP COLUMN "library_selection",
ADD COLUMN     "library_selection" "library_selection" NOT NULL,
DROP COLUMN "lib_layout",
ADD COLUMN     "lib_layout" "lib_layout" NOT NULL,
DROP COLUMN "filetype",
ADD COLUMN     "filetype" "filetype" NOT NULL,
ALTER COLUMN "date_modified" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Analysis_Data" ALTER COLUMN "date_modified" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Metag_Prep_Data" DROP COLUMN "library_strategy",
ADD COLUMN     "library_strategy" "library_strategy" NOT NULL,
DROP COLUMN "library_source",
ADD COLUMN     "library_source" "library_source" NOT NULL,
DROP COLUMN "library_selection",
ADD COLUMN     "library_selection" "library_selection" NOT NULL,
DROP COLUMN "lib_layout",
ADD COLUMN     "lib_layout" "lib_layout" NOT NULL,
DROP COLUMN "filetype",
ADD COLUMN     "filetype" "filetype" NOT NULL,
ALTER COLUMN "date_modified" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Study_Data" ALTER COLUMN "date_modified" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Water_Sample_Data" DROP COLUMN "sample_type",
ADD COLUMN     "sample_type" "sample_type",
DROP COLUMN "oxy_stat_samp",
ADD COLUMN     "oxy_stat_samp" "oxy_stat_samp",
DROP COLUMN "rel_to_oxygen",
ADD COLUMN     "rel_to_oxygen" "rel_to_oxy",
DROP COLUMN "tidal_stage",
ADD COLUMN     "tidal_stage" "tidal_stage",
ALTER COLUMN "date_modified" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Taxonomy" (
    "id" TEXT NOT NULL,
    "level0" TEXT,
    "level1" TEXT,
    "level2" TEXT,
    "level3" TEXT,
    "level4" TEXT,
    "level5" TEXT,
    "level6" TEXT,
    "level7" TEXT,
    "level8" TEXT,
    "level9" TEXT,

    CONSTRAINT "Taxonomy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "taxonomyId" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Occurrence" (
    "id" TEXT NOT NULL,
    "occurence" INTEGER NOT NULL,
    "featureId" TEXT NOT NULL,
    "sampleId" TEXT NOT NULL,
    "study_DataId" TEXT,

    CONSTRAINT "Occurrence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SampleMetadata" (
    "id" TEXT NOT NULL,
    "sample_name" TEXT NOT NULL,
    "replicate" "replicate",
    "serial_number" TEXT NOT NULL,
    "extract_number" TEXT,
    "sequid_16s_xxx" TEXT,
    "seqid_18s_xxx" TEXT,
    "seqid_12s_xxx" TEXT,
    "project_id" TEXT NOT NULL,
    "project_title" TEXT NOT NULL,
    "project_description" TEXT NOT NULL,
    "project_proposal" TEXT NOT NULL,
    "notes" TEXT,
    "collection_date_only" TIMESTAMP(3) NOT NULL,
    "collection_time_local_only" TIMESTAMP(3) NOT NULL,
    "cruise" TEXT,
    "station" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "degrees_latitude" DOUBLE PRECISION NOT NULL,
    "degrees_longitude" DOUBLE PRECISION NOT NULL,
    "depth_meters" INTEGER NOT NULL,
    "depth_category" "depth_category",
    "ctd_bottle_no" INTEGER NOT NULL,
    "volume_filtered_ml" INTEGER NOT NULL,
    "sample_collection_device" "sample_collection_device" NOT NULL,
    "sample_collection_method" "sample_collection_method" NOT NULL,
    "sample_material_processing" TEXT NOT NULL,
    "size_fraction" TEXT NOT NULL,
    "env_material" TEXT NOT NULL,
    "sample_type" "sample_type" NOT NULL,
    "temperature_celsius" DOUBLE PRECISION NOT NULL,
    "ph" DOUBLE PRECISION NOT NULL,
    "salinity" DOUBLE PRECISION NOT NULL,
    "pressure" INTEGER NOT NULL,
    "temp_station" TEXT NOT NULL,
    "temp_depth" TEXT NOT NULL,
    "ctdoxy" DOUBLE PRECISION NOT NULL,
    "oxygen_umol_kg" DOUBLE PRECISION NOT NULL,
    "silicate_umol_kg" DOUBLE PRECISION NOT NULL,
    "nitrate_umol_kg" DOUBLE PRECISION NOT NULL,
    "nitrate_nitrite_umol_kg" DOUBLE PRECISION NOT NULL,
    "nh4_umol_kg" DOUBLE PRECISION NOT NULL,
    "dic_umol_kg" DOUBLE PRECISION NOT NULL,
    "pco2_mea_uatm" DOUBLE PRECISION NOT NULL,
    "ph_tot_mea" DOUBLE PRECISION NOT NULL,
    "carbonate_umol_kg" DOUBLE PRECISION NOT NULL,
    "dna_sample_number" INTEGER NOT NULL,
    "plate" "plate" NOT NULL,
    "plate_name" TEXT NOT NULL,
    "well_number" INTEGER NOT NULL,
    "well_position" TEXT NOT NULL,
    "station_depth" TEXT NOT NULL,
    "ship_crs_expocode" TEXT NOT NULL,
    "woce_sect" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "utc_time" TIMESTAMP(3) NOT NULL,
    "lat_lon" TEXT NOT NULL,
    "submitted_to_insdc" TEXT NOT NULL,
    "investigation_type" TEXT NOT NULL,
    "samp_mat_process" TEXT NOT NULL,
    "target_gene" "target_gene" NOT NULL,
    "additional_notes" TEXT,
    "notes_on_bottle_metadata" TEXT,

    CONSTRAINT "SampleMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherMetadata" (
    "id" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "sampleId" TEXT NOT NULL,

    CONSTRAINT "OtherMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feature_featureId_key" ON "Feature"("featureId");

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_taxonomyId_fkey" FOREIGN KEY ("taxonomyId") REFERENCES "Taxonomy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "SampleMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_study_DataId_fkey" FOREIGN KEY ("study_DataId") REFERENCES "Study_Data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherMetadata" ADD CONSTRAINT "OtherMetadata_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "SampleMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
