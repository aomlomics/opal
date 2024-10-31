/*
  Warnings:

  - You are about to drop the column `featureId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `taxonomyId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `markerId` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `featureId` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `sampleId` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `libraryId` on the `Run` table. All the data in the column will be lost.
  - You are about to drop the column `markerId` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `studyId` on the `Sample` table. All the data in the column will be lost.
  - The primary key for the `Taxonomy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stringIdentifier` on the `Taxonomy` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taxonomy]` on the table `Taxonomy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seq_id` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxonomy` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assay_name` to the `GenericData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `library_id` to the `GenericData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `GenericData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runId` to the `GenericData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `samp_name` to the `GenericData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assay_name` to the `Library` table without a default value. This is not possible if the table is not empty.
  - Added the required column `samp_name` to the `Occurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seq_id` to the `Occurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `library_id` to the `Run` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assay_name` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `env_broad_scale` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `env_local_scale` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `env_medium` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDate` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geo_loc_name` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `samp_category` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxonomy` to the `Taxonomy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_featureId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_taxonomyId_fkey";

-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_consensusTaxonomyId_fkey";

-- DropForeignKey
ALTER TABLE "Library" DROP CONSTRAINT "Library_markerId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_featureId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_sampleId_fkey";

-- DropForeignKey
ALTER TABLE "Run" DROP CONSTRAINT "Run_libraryId_fkey";

-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_markerId_fkey";

-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_studyId_fkey";

-- DropIndex
DROP INDEX "Taxonomy_stringIdentifier_key";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "featureId",
DROP COLUMN "taxonomyId",
ADD COLUMN     "seq_id" TEXT NOT NULL,
ADD COLUMN     "taxonomy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GenericData" ADD COLUMN     "assay_name" TEXT NOT NULL,
ADD COLUMN     "library_id" TEXT NOT NULL,
ADD COLUMN     "project_id" TEXT NOT NULL,
ADD COLUMN     "runId" INTEGER NOT NULL,
ADD COLUMN     "samp_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Library" DROP COLUMN "markerId",
ADD COLUMN     "assay_name" TEXT NOT NULL,
ADD COLUMN     "filename" TEXT,
ADD COLUMN     "filename2" TEXT,
ADD COLUMN     "mid_forward" TEXT,
ADD COLUMN     "mid_reverse" TEXT;

-- AlterTable
ALTER TABLE "Marker" ADD COLUMN     "pcr_plate_id" TEXT;

-- AlterTable
ALTER TABLE "Occurrence" DROP COLUMN "featureId",
DROP COLUMN "sampleId",
ADD COLUMN     "samp_name" TEXT NOT NULL,
ADD COLUMN     "seq_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Run" DROP COLUMN "libraryId",
ADD COLUMN     "library_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sample" DROP COLUMN "markerId",
DROP COLUMN "studyId",
ADD COLUMN     "assay_name" TEXT NOT NULL,
ADD COLUMN     "biological_rep_relation" TEXT,
ADD COLUMN     "chlorophyll" DOUBLE PRECISION,
ADD COLUMN     "concentration" DOUBLE PRECISION,
ADD COLUMN     "concentration_method" TEXT,
ADD COLUMN     "diss_inorg_carb" DOUBLE PRECISION,
ADD COLUMN     "diss_inorg_nitro" DOUBLE PRECISION,
ADD COLUMN     "diss_org_carb" DOUBLE PRECISION,
ADD COLUMN     "diss_org_nitro" DOUBLE PRECISION,
ADD COLUMN     "diss_oxygen" DOUBLE PRECISION,
ADD COLUMN     "dna_cleanup_0_1" BOOLEAN,
ADD COLUMN     "dna_cleanup_method" TEXT,
ADD COLUMN     "elev" DOUBLE PRECISION,
ADD COLUMN     "env_broad_scale" TEXT NOT NULL,
ADD COLUMN     "env_local_scale" TEXT NOT NULL,
ADD COLUMN     "env_medium" TEXT NOT NULL,
ADD COLUMN     "eventDate" TEXT NOT NULL,
ADD COLUMN     "eventDurationUnit" TEXT,
ADD COLUMN     "eventDurationValue" INTEGER,
ADD COLUMN     "filter_diameter" DOUBLE PRECISION,
ADD COLUMN     "filter_material" TEXT,
ADD COLUMN     "filter_name" TEXT,
ADD COLUMN     "filter_onsite_dur" TEXT,
ADD COLUMN     "filter_passive_active_0_1" BOOLEAN,
ADD COLUMN     "filter_surface_area" DOUBLE PRECISION,
ADD COLUMN     "geo_loc_name" TEXT NOT NULL,
ADD COLUMN     "habitat_natural_artificial_0_1" BOOLEAN,
ADD COLUMN     "input_read_count" INTEGER,
ADD COLUMN     "light_intensity" DOUBLE PRECISION,
ADD COLUMN     "maximumDepthInMeters" DOUBLE PRECISION,
ADD COLUMN     "minimumDepthInMeters" DOUBLE PRECISION,
ADD COLUMN     "misc_param" DOUBLE PRECISION,
ADD COLUMN     "nitrate" DOUBLE PRECISION,
ADD COLUMN     "nitrite" DOUBLE PRECISION,
ADD COLUMN     "nitro" DOUBLE PRECISION,
ADD COLUMN     "nucl_acid_ext" TEXT,
ADD COLUMN     "nucl_acid_ext_kit" TEXT,
ADD COLUMN     "nucl_acid_ext_lysis" TEXT,
ADD COLUMN     "nucl_acid_ext_method_additional" TEXT,
ADD COLUMN     "nucl_acid_ext_modify" TEXT,
ADD COLUMN     "nucl_acid_ext_sep" TEXT,
ADD COLUMN     "org_carb" DOUBLE PRECISION,
ADD COLUMN     "org_matter" DOUBLE PRECISION,
ADD COLUMN     "org_nitro" DOUBLE PRECISION,
ADD COLUMN     "otu_num_tax_assgined" INTEGER,
ADD COLUMN     "output_otu_num" INTEGER,
ADD COLUMN     "output_read_count" INTEGER,
ADD COLUMN     "part_org_carb" DOUBLE PRECISION,
ADD COLUMN     "part_org_nitro" DOUBLE PRECISION,
ADD COLUMN     "ph" DOUBLE PRECISION,
ADD COLUMN     "ph_meth" TEXT,
ADD COLUMN     "pool_dna_num" DOUBLE PRECISION,
ADD COLUMN     "precip_chem_prep" TEXT,
ADD COLUMN     "precip_force_prep" DOUBLE PRECISION,
ADD COLUMN     "precip_temp_prep" DOUBLE PRECISION,
ADD COLUMN     "precip_time_prep" DOUBLE PRECISION,
ADD COLUMN     "prep_method_additional" TEXT,
ADD COLUMN     "prepped_samp_store_dur" DOUBLE PRECISION,
ADD COLUMN     "prepped_samp_store_sol" TEXT,
ADD COLUMN     "prepped_samp_store_temp" TEXT,
ADD COLUMN     "project_id" TEXT NOT NULL,
ADD COLUMN     "ratioOfAbsorbance260_280" DOUBLE PRECISION,
ADD COLUMN     "rel_cont_id" TEXT,
ADD COLUMN     "salinity" DOUBLE PRECISION,
ADD COLUMN     "samp_category" TEXT NOT NULL,
ADD COLUMN     "samp_collect_device" TEXT,
ADD COLUMN     "samp_collect_method" TEXT,
ADD COLUMN     "samp_mat_process" TEXT,
ADD COLUMN     "samp_size" DOUBLE PRECISION,
ADD COLUMN     "samp_size_unit" TEXT,
ADD COLUMN     "samp_store_dur" TEXT,
ADD COLUMN     "samp_store_method_additional" TEXT,
ADD COLUMN     "samp_store_sol" TEXT,
ADD COLUMN     "samp_store_temp" TEXT,
ADD COLUMN     "samp_vol_we_dna_ext" DOUBLE PRECISION,
ADD COLUMN     "samp_vol_we_dna_ext_unit" TEXT,
ADD COLUMN     "samp_weather" TEXT,
ADD COLUMN     "sample_composed_of" TEXT,
ADD COLUMN     "sample_derived_from" TEXT,
ADD COLUMN     "size_frac" DOUBLE PRECISION,
ADD COLUMN     "size_frac_low" DOUBLE PRECISION,
ADD COLUMN     "solar_irradiance" TEXT,
ADD COLUMN     "suspend_part_matter" DOUBLE PRECISION,
ADD COLUMN     "temp" DOUBLE PRECISION,
ADD COLUMN     "tidal_stage" TEXT,
ADD COLUMN     "tot_carb" DOUBLE PRECISION,
ADD COLUMN     "tot_depth_water_col" DOUBLE PRECISION,
ADD COLUMN     "tot_diss_nitro" DOUBLE PRECISION,
ADD COLUMN     "tot_inorg_nitro" DOUBLE PRECISION,
ADD COLUMN     "tot_nitro" DOUBLE PRECISION,
ADD COLUMN     "tot_nitro_cont_meth" DOUBLE PRECISION,
ADD COLUMN     "tot_nitro_content" DOUBLE PRECISION,
ADD COLUMN     "tot_org_c_meth" DOUBLE PRECISION,
ADD COLUMN     "tot_org_carb" DOUBLE PRECISION,
ADD COLUMN     "tot_part_carb" DOUBLE PRECISION,
ADD COLUMN     "turbidity" DOUBLE PRECISION,
ADD COLUMN     "verbatimCoordinateSystem" TEXT,
ADD COLUMN     "verbatimDateEnd" TEXT,
ADD COLUMN     "verbatimEventDate" TEXT,
ADD COLUMN     "verbatimEventTime" TEXT,
ADD COLUMN     "verbatimLatitude" TEXT,
ADD COLUMN     "verbatimLongitude" TEXT,
ADD COLUMN     "verbatimSRS" TEXT,
ADD COLUMN     "verbatimTimeEnd" TEXT,
ADD COLUMN     "water_current" DOUBLE PRECISION,
ADD COLUMN     "wind_direction" TEXT,
ADD COLUMN     "wind_speed" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Taxonomy" DROP CONSTRAINT "Taxonomy_pkey",
DROP COLUMN "stringIdentifier",
ADD COLUMN     "taxonomy" TEXT NOT NULL,
ADD CONSTRAINT "Taxonomy_pkey" PRIMARY KEY ("taxonomy");

-- CreateIndex
CREATE UNIQUE INDEX "Taxonomy_taxonomy_key" ON "Taxonomy"("taxonomy");

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Study"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_assay_name_fkey" FOREIGN KEY ("assay_name") REFERENCES "Marker"("assay_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_assay_name_fkey" FOREIGN KEY ("assay_name") REFERENCES "Marker"("assay_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "Library"("library_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_samp_name_fkey" FOREIGN KEY ("samp_name") REFERENCES "Sample"("samp_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_seq_id_fkey" FOREIGN KEY ("seq_id") REFERENCES "Feature"("seq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_consensusTaxonomyId_fkey" FOREIGN KEY ("consensusTaxonomyId") REFERENCES "Taxonomy"("taxonomy") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_seq_id_fkey" FOREIGN KEY ("seq_id") REFERENCES "Feature"("seq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_taxonomy_fkey" FOREIGN KEY ("taxonomy") REFERENCES "Taxonomy"("taxonomy") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Study"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_samp_name_fkey" FOREIGN KEY ("samp_name") REFERENCES "Sample"("samp_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_assay_name_fkey" FOREIGN KEY ("assay_name") REFERENCES "Marker"("assay_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "Library"("library_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
