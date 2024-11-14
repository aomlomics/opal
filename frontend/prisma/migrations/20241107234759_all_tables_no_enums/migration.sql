/*
  Warnings:

  - You are about to drop the column `confidence` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `seq_id` on the `Assignment` table. All the data in the column will be lost.
  - The primary key for the `Feature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `seq_id` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `sequence` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `runId` on the `GenericData` table. All the data in the column will be lost.
  - You are about to drop the column `runId` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `seq_id` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `assay_name` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `input_read_count` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `otu_num_tax_assgined` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `output_otu_num` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `output_read_count` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `rel_cont_id` on the `Sample` table. All the data in the column will be lost.
  - You are about to alter the column `pool_dna_num` on the `Sample` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - The `prepped_samp_store_temp` column on the `Sample` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `samp_store_temp` column on the `Sample` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Marker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Run` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[featureid]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Confidence` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `analysisId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `featureid` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dna_sequence` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `featureid` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `analysisId` to the `GenericData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `analysisId` to the `Occurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `featureid` to the `Occurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkls_ver` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detection_type` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_contact` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recordedBy` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verbatimIdentification` to the `Taxonomy` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeadBoolean" AS ENUM ('0', '1', 'not applicable', 'not collected', 'not provided', 'missing');

-- CreateEnum
CREATE TYPE "detection_type" AS ENUM ('targeted taxon detection', 'multi taxon detection', 'other');

-- CreateEnum
CREATE TYPE "neg_cont_type" AS ENUM ('site negative', 'field negative', 'process negative', 'extraction negative', 'PCR negative', 'other');

-- CreateEnum
CREATE TYPE "target_gene" AS ENUM ('12S rRNA', '16S rRNA', '18S rRNA', '23S rRNA', '28S rRNA', 'rbcL', 'CytB', 'COI', 'COII', 'COIII', 'nifH', 'ITS', 'ND1', 'ND2', 'ND3', 'ND4', 'ND5', 'ND6', 'amoA', 'rpoB', 'rpoC1', 'rpoC2', 'matK', 'trnH', 'trnL', 'psbK', 'D-loop', 'other');

-- CreateEnum
CREATE TYPE "probeQuencher" AS ENUM ('Zero-End Quencher (ZEN)', 'TAMRA', 'lowa Black', 'Minor Groove Binder (MGB)', 'Black Hole Quencher (BHQ)', 'other');

-- CreateEnum
CREATE TYPE "barcoding_pcr_appr" AS ENUM ('one-step PCR', 'two-step PCR', 'ligation-based', 'other');

-- CreateEnum
CREATE TYPE "platform" AS ENUM ('ILLUMINA', 'BGISEQ', 'CAPILLARY', 'DNBSEQ', 'ELEMENT', 'GENAPSYS', 'GENEMIND', 'HELICOS', 'ION_TORRENT', 'LS454', 'OXFORD_NANOPORE', 'PACBIO_SMRT', 'TAPESTRI', 'VELA_DIAGNOSTICS', 'ULTIMA', 'other');

-- CreateEnum
CREATE TYPE "lib_layout" AS ENUM ('paired end', 'single end', 'other');

-- CreateEnum
CREATE TYPE "error_rate_type" AS ENUM ('Phred score', 'expected error rate', 'other');

-- CreateEnum
CREATE TYPE "min_reads_cutoff_unit" AS ENUM ('reads', '%', 'other');

-- CreateEnum
CREATE TYPE "tax_assign_cat" AS ENUM ('sequence similarity', 'sequence composition', 'phylogeny', 'probabilistic', 'other');

-- CreateEnum
CREATE TYPE "samp_category" AS ENUM ('sample', 'negative control', 'positive control', 'PCR standard', 'other');

-- CreateEnum
CREATE TYPE "verbatimCoordinateSystem" AS ENUM ('decimal degrees', 'degrees minutes seconds', 'UTM', 'other');

-- CreateEnum
CREATE TYPE "verbatimSRS" AS ENUM ('WGS84', 'NAD84', 'NAD27', 'GDA94', 'GDA2020', 'ETRS89', 'JGD2000', 'other');

-- CreateEnum
CREATE TYPE "eventDurationUnit" AS ENUM ('minutes', 'hours', 'days', 'months', 'years');

-- CreateEnum
CREATE TYPE "samp_size_unit" AS ENUM ('mL', 'L', 'mg', 'g', 'kg', 'cm2', 'm2', 'cm3', 'm3', 'other');

-- CreateEnum
CREATE TYPE "samp_store_sol" AS ENUM ('ethanol', 'sodium acetate', 'longmire', 'lysis buffer', 'none', 'other');

-- CreateEnum
CREATE TYPE "filter_material" AS ENUM ('cellulose', 'cellulose ester', 'glass fiber', 'thermoplastic membrane', 'track etched polycarbonate', 'nylon', 'other');

-- CreateEnum
CREATE TYPE "precip_chem_prep" AS ENUM ('ethanol', 'isopropanol', 'sodium chloride', 'other');

-- CreateEnum
CREATE TYPE "prepped_samp_store_sol" AS ENUM ('ethanol', 'sodium acetate', 'longmire', 'lysis buffer', 'none', 'other');

-- CreateEnum
CREATE TYPE "samp_vol_we_dna_ext_unit" AS ENUM ('mL', 'L', 'mg', 'g', 'kg', 'cm2', 'm2', 'cm3', 'm3', 'other');

-- CreateEnum
CREATE TYPE "nucl_acid_ext_lysis" AS ENUM ('physical', 'chemical', 'enzymatic', 'thermal', 'osmotic', 'other');

-- CreateEnum
CREATE TYPE "nucl_acid_ext_sep" AS ENUM ('column-based', 'magnetic beads', 'centrifugation', 'precipitation', 'phenol chloroform', 'g', 'electrophoresis', 'other');

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_seq_id_fkey";

-- DropForeignKey
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_assay_name_fkey";

-- DropForeignKey
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_runId_fkey";

-- DropForeignKey
ALTER TABLE "Library" DROP CONSTRAINT "Library_assay_name_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_runId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_seq_id_fkey";

-- DropForeignKey
ALTER TABLE "Run" DROP CONSTRAINT "Run_library_id_fkey";

-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_assay_name_fkey";

-- DropIndex
DROP INDEX "Feature_seq_id_key";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "confidence",
DROP COLUMN "seq_id",
ADD COLUMN     "Confidence" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "analysisId" INTEGER NOT NULL,
ADD COLUMN     "featureid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_pkey",
DROP COLUMN "seq_id",
DROP COLUMN "sequence",
ADD COLUMN     "dna_sequence" TEXT NOT NULL,
ADD COLUMN     "featureid" TEXT NOT NULL,
ADD CONSTRAINT "Feature_pkey" PRIMARY KEY ("featureid");

-- AlterTable
ALTER TABLE "GenericData" DROP COLUMN "runId",
ADD COLUMN     "analysisId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Library" ADD COLUMN     "adapter_forward" TEXT,
ADD COLUMN     "adapter_reverse" TEXT,
ADD COLUMN     "associatedSequences" TEXT,
ADD COLUMN     "barcoding_pcr_appr" TEXT,
ADD COLUMN     "biosample_accession" TEXT,
ADD COLUMN     "input_read_count" INTEGER,
ADD COLUMN     "instrument" TEXT,
ADD COLUMN     "lib_layout" TEXT,
ADD COLUMN     "lib_screen" TEXT,
ADD COLUMN     "platform" TEXT,
ADD COLUMN     "seq_kit" TEXT,
ADD COLUMN     "seq_method_additional" TEXT,
ADD COLUMN     "seq_run_id" TEXT,
ADD COLUMN     "seq_samp_id" TEXT,
ADD COLUMN     "sequencing_location" TEXT;

-- AlterTable
ALTER TABLE "Occurrence" DROP COLUMN "runId",
DROP COLUMN "seq_id",
ADD COLUMN     "analysisId" INTEGER NOT NULL,
ADD COLUMN     "featureid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sample" DROP COLUMN "assay_name",
DROP COLUMN "input_read_count",
DROP COLUMN "otu_num_tax_assgined",
DROP COLUMN "output_otu_num",
DROP COLUMN "output_read_count",
DROP COLUMN "rel_cont_id",
ADD COLUMN     "ammonium" TEXT,
ADD COLUMN     "ctd_bottle_number" TEXT,
ADD COLUMN     "ctd_cast_number" TEXT,
ADD COLUMN     "extract_id" TEXT,
ADD COLUMN     "line_id" TEXT,
ADD COLUMN     "materialSampleID" TEXT,
ADD COLUMN     "phaeopigments" TEXT,
ADD COLUMN     "phosphate" TEXT,
ADD COLUMN     "replicate_number" TEXT,
ADD COLUMN     "serial_number" TEXT,
ADD COLUMN     "silicate" TEXT,
ADD COLUMN     "station_id" TEXT,
ALTER COLUMN "eventDurationValue" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "pool_dna_num" SET DATA TYPE INTEGER,
DROP COLUMN "prepped_samp_store_temp",
ADD COLUMN     "prepped_samp_store_temp" DOUBLE PRECISION,
DROP COLUMN "samp_store_temp",
ADD COLUMN     "samp_store_temp" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Study" ADD COLUMN     "accessRights" TEXT,
ADD COLUMN     "associated_resource" TEXT,
ADD COLUMN     "bibliographicCitation" TEXT,
ADD COLUMN     "checkls_ver" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "code_repo" TEXT,
ADD COLUMN     "dataGeneralizations" TEXT,
ADD COLUMN     "detection_type" TEXT NOT NULL,
ADD COLUMN     "expedition_id" TEXT,
ADD COLUMN     "informationWithheld" TEXT,
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "institutionID" TEXT,
ADD COLUMN     "license" TEXT,
ADD COLUMN     "mod_date" TIMESTAMP(3),
ADD COLUMN     "project_contact" TEXT NOT NULL,
ADD COLUMN     "project_name" TEXT,
ADD COLUMN     "recordedBy" TEXT NOT NULL,
ADD COLUMN     "recordedByID" TEXT,
ADD COLUMN     "rightsHolder" TEXT,
ADD COLUMN     "seq_archive" TEXT,
ADD COLUMN     "study_factor" TEXT;

-- AlterTable
ALTER TABLE "Taxonomy" ADD COLUMN     "division" TEXT,
ADD COLUMN     "domain" TEXT,
ADD COLUMN     "subdivision" TEXT,
ADD COLUMN     "supergroup" TEXT,
ADD COLUMN     "verbatimIdentification" TEXT NOT NULL;

-- DropTable
DROP TABLE "Marker";

-- DropTable
DROP TABLE "Run";

-- CreateTable
CREATE TABLE "Assay" (
    "assay_name" TEXT NOT NULL,
    "neg_cont_type" TEXT NOT NULL,
    "pos_cont_type" TEXT NOT NULL,
    "sterilise_method" TEXT,
    "pcr_0_1" BOOLEAN NOT NULL,
    "thermocycler" TEXT,
    "amplificationReactionVolume" DOUBLE PRECISION,
    "assay_validation" TEXT,
    "targetTaxonomicAssay" TEXT NOT NULL,
    "targetTaxonomicScope" TEXT,
    "target_gene" TEXT,
    "target_subfragment" TEXT,
    "ampliconSize" DOUBLE PRECISION,
    "pcr_primer_forward" TEXT NOT NULL,
    "pcr_primer_reverse" TEXT NOT NULL,
    "pcr_primer_name_forward" TEXT,
    "pcr_primer_name_reverse" TEXT,
    "pcr_primer_reference_forward" TEXT,
    "pcr_primer_reference_reverse" TEXT,
    "pcr_primer_vol_forward" DOUBLE PRECISION,
    "pcr_primer_vol_reverse" DOUBLE PRECISION,
    "pcr_primer_conc_forward" DOUBLE PRECISION,
    "pcr_primer_conc_reverse" DOUBLE PRECISION,
    "probeReporter" TEXT,
    "probeQuencher" TEXT,
    "probe_seq" TEXT,
    "probe_ref" TEXT,
    "probe_conc" DOUBLE PRECISION,
    "commercial_mm" TEXT,
    "custom_mm" TEXT,
    "pcr_dna_vol" DOUBLE PRECISION,
    "pcr_rep" INTEGER,
    "nucl_acid_amp" TEXT,
    "pcr_cond" TEXT,
    "annealingTemp" DOUBLE PRECISION,
    "pcr_cycles" DOUBLE PRECISION,
    "pcr_analysis_software" TEXT,
    "pcr_method_additional" TEXT,
    "pcr_plate_id" TEXT,
    "rel_cont_id" TEXT,

    CONSTRAINT "Assay_pkey" PRIMARY KEY ("assay_name")
);

-- CreateTable
CREATE TABLE "Analysis" (
    "id" SERIAL NOT NULL,
    "assay_name" TEXT NOT NULL,
    "sop_bioinformatics" TEXT,
    "trim_method" TEXT,
    "trim_param" TEXT,
    "demux_tool" TEXT,
    "demux_max_mismatch" INTEGER,
    "merge_tool" TEXT,
    "merge_min_overlap" INTEGER,
    "min_len_cutoff" INTEGER,
    "min_len_tool" TEXT,
    "error_rate_tool" TEXT,
    "error_rate_type" TEXT,
    "error_rate_cutoff" DOUBLE PRECISION,
    "chimera_check_method" TEXT,
    "chimera_check_param" TEXT,
    "otu_clust_tool" TEXT,
    "otu_clust_cutoff" DOUBLE PRECISION,
    "min_reads_cutoff" DOUBLE PRECISION,
    "min_reads_cutoff_unit" TEXT,
    "min_reads_tool" TEXT,
    "otu_db" TEXT,
    "otu_db_custom" TEXT,
    "tax_assign_cat" TEXT,
    "otu_seq_comp_appr" TEXT,
    "tax_class_id_cutoff" DOUBLE PRECISION,
    "tax_class_query_cutoff" DOUBLE PRECISION,
    "tax_class_collapse" TEXT,
    "tax_class_other" TEXT,
    "screen_contam_method" TEXT,
    "screen_geograph_method" TEXT,
    "screen_nontarget_method" TEXT,
    "screen_other" TEXT,
    "bioinfo_method_additional" TEXT,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AssayToSample" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnalysisToLibrary" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Assay_assay_name_key" ON "Assay"("assay_name");

-- CreateIndex
CREATE UNIQUE INDEX "_AssayToSample_AB_unique" ON "_AssayToSample"("A", "B");

-- CreateIndex
CREATE INDEX "_AssayToSample_B_index" ON "_AssayToSample"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnalysisToLibrary_AB_unique" ON "_AnalysisToLibrary"("A", "B");

-- CreateIndex
CREATE INDEX "_AnalysisToLibrary_B_index" ON "_AnalysisToLibrary"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_featureid_key" ON "Feature"("featureid");

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_assay_name_fkey" FOREIGN KEY ("assay_name") REFERENCES "Assay"("assay_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_assay_name_fkey" FOREIGN KEY ("assay_name") REFERENCES "Assay"("assay_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_featureid_fkey" FOREIGN KEY ("featureid") REFERENCES "Feature"("featureid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_featureid_fkey" FOREIGN KEY ("featureid") REFERENCES "Feature"("featureid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_assay_name_fkey" FOREIGN KEY ("assay_name") REFERENCES "Assay"("assay_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssayToSample" ADD CONSTRAINT "_AssayToSample_A_fkey" FOREIGN KEY ("A") REFERENCES "Assay"("assay_name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssayToSample" ADD CONSTRAINT "_AssayToSample_B_fkey" FOREIGN KEY ("B") REFERENCES "Sample"("samp_name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnalysisToLibrary" ADD CONSTRAINT "_AnalysisToLibrary_A_fkey" FOREIGN KEY ("A") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnalysisToLibrary" ADD CONSTRAINT "_AnalysisToLibrary_B_fkey" FOREIGN KEY ("B") REFERENCES "Library"("library_id") ON DELETE CASCADE ON UPDATE CASCADE;
