-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "project_id_external" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "project_contact" TEXT NOT NULL,
    "project_description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "citation" TEXT,
    "keywords" TEXT,
    "associated_parties" TEXT,
    "study_area_description" TEXT,
    "external_links" TEXT,
    "recorded_by" TEXT,
    "sampling_description" TEXT,
    "grant_number" TEXT,
    "grant_title" TEXT,
    "grant_agency" TEXT,
    "project_proposal" TEXT,
    "accessions" TEXT,
    "metadata_notes" TEXT,
    "date_modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_project_id_key" ON "Project"("project_id");
