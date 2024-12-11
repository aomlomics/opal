/*
  Warnings:

  - You are about to drop the `Study` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Analysis" DROP CONSTRAINT "Analysis_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_project_id_fkey";

-- DropTable
DROP TABLE "Study";

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "project_id" TEXT NOT NULL,
    "recordedBy" TEXT NOT NULL,
    "recordedByID" TEXT,
    "project_contact" TEXT NOT NULL,
    "institution" TEXT,
    "institutionID" TEXT,
    "project_name" TEXT NOT NULL,
    "study_factor" TEXT,
    "detection_type" TEXT NOT NULL,
    "license" TEXT,
    "rightsHolder" TEXT,
    "accessRights" TEXT,
    "informationWithheld" TEXT,
    "dataGeneralizations" TEXT,
    "bibliographicCitation" TEXT,
    "associated_resource" TEXT,
    "mod_date" TIMESTAMP(3),
    "checkls_ver" DOUBLE PRECISION NOT NULL,
    "seq_archive" TEXT,
    "code_repo" TEXT,
    "expedition_id" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_project_id_key" ON "Project"("project_id");

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;
