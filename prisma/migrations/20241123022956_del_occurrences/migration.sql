/*
  Warnings:

  - You are about to drop the column `analysisId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `analysisId` on the `GenericData` table. All the data in the column will be lost.
  - You are about to drop the column `analysisId` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the `Observation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[analysis_run_name]` on the table `Analysis` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[analysis_run_name,featureid]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[analysis_run_name,samp_name,featureid]` on the table `Occurrence` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `analysis_run_name` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `analysis_run_name` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `samp_name` to the `Library` table without a default value. This is not possible if the table is not empty.
  - Added the required column `analysis_run_name` to the `Occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "asv_method" AS ENUM ('dada2pe', 'dada2se', 'deblur', 'other');

-- CreateEnum
CREATE TYPE "dada2_pooling_method" AS ENUM ('independent', 'pseudo', 'standard');

-- CreateEnum
CREATE TYPE "dada2_chimera_method" AS ENUM ('consensus', 'none', 'pooled');

-- DropForeignKey
ALTER TABLE "Analysis" DROP CONSTRAINT "Analysis_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_analysisId_fkey";

-- DropForeignKey
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_analysisId_fkey";

-- DropForeignKey
ALTER TABLE "Observation" DROP CONSTRAINT "Observation_featureid_fkey";

-- DropForeignKey
ALTER TABLE "Observation" DROP CONSTRAINT "Observation_samp_name_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_analysisId_featureid_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_samp_name_featureid_fkey";

-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_project_id_fkey";

-- DropIndex
DROP INDEX "Assignment_analysisId_featureid_key";

-- DropIndex
DROP INDEX "Occurrence_analysisId_samp_name_featureid_key";

-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "analysis_run_name" TEXT NOT NULL,
ADD COLUMN     "asv_method" TEXT,
ADD COLUMN     "dada2_chimera_method" TEXT,
ADD COLUMN     "dada2_max_ee_f" INTEGER,
ADD COLUMN     "dada2_min_fold_parent_over_abundance" INTEGER,
ADD COLUMN     "dada2_n_reads_learn" INTEGER,
ADD COLUMN     "dada2_pooling_method" TEXT,
ADD COLUMN     "dada2_trim_left_f" INTEGER,
ADD COLUMN     "dada2_trunc_len_f" INTEGER,
ADD COLUMN     "dada2_trunc_q" INTEGER,
ADD COLUMN     "dada2pe_max_ee_r" INTEGER,
ADD COLUMN     "dada2pe_trim_left_r" INTEGER,
ADD COLUMN     "dada2pe_trunc_len_r" INTEGER,
ADD COLUMN     "deblur_indel_max" INTEGER,
ADD COLUMN     "deblur_indel_prob" DOUBLE PRECISION,
ADD COLUMN     "deblur_mean_error" DOUBLE PRECISION,
ADD COLUMN     "deblur_min_reads" INTEGER,
ADD COLUMN     "deblur_min_size" INTEGER,
ADD COLUMN     "deblur_sample_stats" BOOLEAN,
ADD COLUMN     "deblur_trim_length" INTEGER,
ADD COLUMN     "discard_untrimmed" BOOLEAN,
ADD COLUMN     "repseq_max_length" INTEGER,
ADD COLUMN     "repseq_min_abundance" DOUBLE PRECISION,
ADD COLUMN     "repseq_min_length" INTEGER,
ADD COLUMN     "repseq_min_prevalence" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "analysisId",
ADD COLUMN     "analysis_run_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GenericData" DROP COLUMN "analysisId",
ADD COLUMN     "analysis_run_name" TEXT;

-- AlterTable
ALTER TABLE "Library" ADD COLUMN     "samp_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Occurrence" DROP COLUMN "analysisId",
ADD COLUMN     "analysis_run_name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Observation";

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_analysis_run_name_key" ON "Analysis"("analysis_run_name");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_analysis_run_name_featureid_key" ON "Assignment"("analysis_run_name", "featureid");

-- CreateIndex
CREATE UNIQUE INDEX "Occurrence_analysis_run_name_samp_name_featureid_key" ON "Occurrence"("analysis_run_name", "samp_name", "featureid");

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Study"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_samp_name_fkey" FOREIGN KEY ("samp_name") REFERENCES "Sample"("samp_name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Study"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_samp_name_fkey" FOREIGN KEY ("samp_name") REFERENCES "Sample"("samp_name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_analysis_run_name_fkey" FOREIGN KEY ("analysis_run_name") REFERENCES "Analysis"("analysis_run_name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_featureid_fkey" FOREIGN KEY ("featureid") REFERENCES "Feature"("featureid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_analysis_run_name_fkey" FOREIGN KEY ("analysis_run_name") REFERENCES "Analysis"("analysis_run_name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_analysis_run_name_fkey" FOREIGN KEY ("analysis_run_name") REFERENCES "Analysis"("analysis_run_name") ON DELETE SET NULL ON UPDATE CASCADE;
