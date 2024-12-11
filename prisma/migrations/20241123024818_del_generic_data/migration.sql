/*
  Warnings:

  - You are about to drop the `GenericData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_analysis_run_name_fkey";

-- DropForeignKey
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_assay_name_fkey";

-- DropForeignKey
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_library_id_fkey";

-- DropForeignKey
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_project_id_fkey";

-- DropForeignKey
ALTER TABLE "GenericData" DROP CONSTRAINT "GenericData_samp_name_fkey";

-- DropTable
DROP TABLE "GenericData";
