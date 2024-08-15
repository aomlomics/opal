/*
  Warnings:

  - The values [ssRNA_seq] on the enum `library_strategy` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `modified_by` on the `Amplicon_PrepData` table. All the data in the column will be lost.
  - You are about to drop the column `modified_by` on the `Analysis_Data` table. All the data in the column will be lost.
  - You are about to drop the column `taxonomyId` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `modified_by` on the `Metag_Prep_Data` table. All the data in the column will be lost.
  - You are about to drop the column `featureId` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `occurence` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `sampleId` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `study_DataId` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `accessions` on the `Study_Data` table. All the data in the column will be lost.
  - You are about to drop the column `external_links` on the `Study_Data` table. All the data in the column will be lost.
  - You are about to drop the column `metadata_notes` on the `Study_Data` table. All the data in the column will be lost.
  - You are about to drop the column `modified_by` on the `Study_Data` table. All the data in the column will be lost.
  - You are about to drop the column `project_contact` on the `Study_Data` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `Study_Data` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Study_Data` table. All the data in the column will be lost.
  - The `recordedBy` column on the `Study_Data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `grant_number` column on the `Study_Data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `level0` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `level1` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `level2` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `level3` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `level4` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `level5` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `level6` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `level7` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `level8` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `level9` on the `Taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `alkalinity` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `alkalinity_method` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `alkyl_diethers` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `altitude` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `aminopept_act` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `ammonium` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `atmospheric_data` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `bac_prod` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `bac_resp` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `bacteria_carb_prod` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `basisOfRecord` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `biomass` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `bishomohopanol` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `bromide` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `calcium` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `carb_nitro_ratio` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `chem_administration` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `chloride` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `chlorophyll` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `collection_date` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `collection_date_local` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `concentrationUnit` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `conduc` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `countryCode` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `density` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `depth` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `diether_lipids` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `diss_carb_dioxide` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `diss_hydrogen` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `diss_inorg_carb` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `diss_inorg_nitro` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `diss_inorg_phosp` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `diss_org_carb` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `diss_org_nitro` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `diss_oxygen` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `dna_conc` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `down_par` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `elev` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `fluor` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `geodeticDatum` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `glucosidase_act` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `isolation_source` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `lat_lon` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `light_intensity` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `magnesium` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `mean_frict_vel` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `mean_peak_frict_vel` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `misc_param` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `modified_by` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `n_alkanes` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `neg_cont_type` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `nitrate` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `nitrite` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `nitro` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `omics_observ_id` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `org_carb` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `org_matter` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `org_nitro` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `organism_count` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `oxy_stat_samp` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `part_org_carb` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `part_org_nitro` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `perturbation` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `petroleum_hydrocarb` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `ph` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `phaeopigments` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `phosphate` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `phosplipid_fatt_acid` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `photon_flux` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `pos_cont_type` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `potassium` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `pressure` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `primary_prod` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `redox_potential` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `rel_to_oxygen` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `salinity` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `silicate` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `size_frac_low` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `size_frac_up` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `sodium` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `soluble_react_phosp` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `source_mat_id` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `sulfate` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `sulfide` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `suspend_part_matter` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `temp` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `tidal_stage` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `tot_depth_water_col` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `tot_diss_nitro` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `tot_inorg_nitro` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `tot_nitro` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `tot_part_carb` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `tot_phosp` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `turbidity` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the column `water_current` on the `Water_Sample_Data` table. All the data in the column will be lost.
  - You are about to drop the `OtherMetadata` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[Study_DataId]` on the table `Amplicon_PrepData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Study_DataId]` on the table `Analysis_Data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Study_DataId]` on the table `Measurement_Metadata` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Study_DataId]` on the table `Metag_Prep_Data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,sample_name]` on the table `Water_Sample_Data` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Study_DataId` to the `Amplicon_PrepData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedBy` to the `Amplicon_PrepData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Study_DataId` to the `Analysis_Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedBy` to the `Analysis_Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TaxonomyId` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Study_DataId` to the `Measurement_Metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_modified` to the `Measurement_Metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedBy` to the `Measurement_Metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Study_DataId` to the `Metag_Prep_Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedBy` to the `Metag_Prep_Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FeatureId` to the `Occurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SampleMetadataId` to the `Occurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organismQuantity` to the `Occurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instrument_model` to the `Study_Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lib_layout` to the `Study_Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform` to the `Study_Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectContact` to the `Study_Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedBy` to the `Study_Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Study_DataId` to the `Water_Sample_Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDate` to the `Water_Sample_Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedBy` to the `Water_Sample_Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "library_strategy_new" AS ENUM ('wga', 'wgs', 'wxs', 'RNA-Seq', 'miRNA-Seq', 'wcs', 'clone', 'poolclone', 'amplicon', 'cloneend', 'finishing', 'ChIP-Seq', 'MNase-Seq', 'DNase-Hypersensitivity', 'Bisulfite-Seq', 'Tn-Seq', 'est', 'FL-cDNA', 'cts', 'MRE-Seq', 'MeDIP-Seq', 'MDB-Seq', 'Synthetic-Long-Read', 'ATAC-seq', 'ChIA-PET', 'FAIRE-seq', 'Hi-C', 'ncRNA-Seq', 'RAD-Seq', 'RIP-Seq', 'selex', 'ssrna_seq', 'Targeted-Capture', 'Tethered Chromatin Conformation Capture', 'other');
ALTER TABLE "Amplicon_PrepData" ALTER COLUMN "library_strategy" TYPE "library_strategy_new" USING ("library_strategy"::text::"library_strategy_new");
ALTER TABLE "Metag_Prep_Data" ALTER COLUMN "library_strategy" TYPE "library_strategy_new" USING ("library_strategy"::text::"library_strategy_new");
ALTER TYPE "library_strategy" RENAME TO "library_strategy_old";
ALTER TYPE "library_strategy_new" RENAME TO "library_strategy";
DROP TYPE "library_strategy_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_taxonomyId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_featureId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_sampleId_fkey";

-- DropForeignKey
ALTER TABLE "Occurrence" DROP CONSTRAINT "Occurrence_study_DataId_fkey";

-- DropForeignKey
ALTER TABLE "OtherMetadata" DROP CONSTRAINT "OtherMetadata_sampleId_fkey";

-- DropIndex
DROP INDEX "Study_Data_project_id_key";

-- AlterTable
ALTER TABLE "Amplicon_PrepData" DROP COLUMN "modified_by",
ADD COLUMN     "Study_DataId" TEXT NOT NULL,
ADD COLUMN     "uploadedBy" TEXT NOT NULL,
ALTER COLUMN "date_dna_extracted" SET DATA TYPE TEXT,
ALTER COLUMN "date_pcr" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Analysis_Data" DROP COLUMN "modified_by",
ADD COLUMN     "Study_DataId" TEXT NOT NULL,
ADD COLUMN     "uploadedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "taxonomyId",
ADD COLUMN     "TaxonomyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Measurement_Metadata" ADD COLUMN     "Study_DataId" TEXT NOT NULL,
ADD COLUMN     "date_modified" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uploadedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Metag_Prep_Data" DROP COLUMN "modified_by",
ADD COLUMN     "Study_DataId" TEXT NOT NULL,
ADD COLUMN     "uploadedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Occurrence" DROP COLUMN "featureId",
DROP COLUMN "occurence",
DROP COLUMN "sampleId",
DROP COLUMN "study_DataId",
ADD COLUMN     "FeatureId" TEXT NOT NULL,
ADD COLUMN     "SampleMetadataId" TEXT NOT NULL,
ADD COLUMN     "Study_DataId" TEXT,
ADD COLUMN     "organismQuantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SampleMetadata" ALTER COLUMN "collection_date_only" SET DATA TYPE TEXT,
ALTER COLUMN "collection_time_local_only" SET DATA TYPE TEXT,
ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "utc_time" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Study_Data" DROP COLUMN "accessions",
DROP COLUMN "external_links",
DROP COLUMN "metadata_notes",
DROP COLUMN "modified_by",
DROP COLUMN "project_contact",
DROP COLUMN "project_id",
DROP COLUMN "type",
ADD COLUMN     "accessRights" TEXT,
ADD COLUMN     "adapter_forward" TEXT,
ADD COLUMN     "adapter_reverse" TEXT,
ADD COLUMN     "associated_resource" TEXT[],
ADD COLUMN     "bibliographicCitation" TEXT,
ADD COLUMN     "concentration_method" TEXT,
ADD COLUMN     "dataGeneralizations" TEXT,
ADD COLUMN     "detection_type" TEXT,
ADD COLUMN     "dna_cleanup_0_1" TEXT,
ADD COLUMN     "dna_cleanup_method" TEXT,
ADD COLUMN     "experimental_factor" TEXT,
ADD COLUMN     "informationWithheld" TEXT,
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "institutionID" TEXT,
ADD COLUMN     "instrument_model" "instrument_model" NOT NULL,
ADD COLUMN     "lib_layout" "lib_layout" NOT NULL,
ADD COLUMN     "lib_screen" TEXT,
ADD COLUMN     "nucl_acid_ext" TEXT,
ADD COLUMN     "nucl_acid_ext_kit" TEXT,
ADD COLUMN     "nucl_acid_ext_modify" TEXT,
ADD COLUMN     "platform" "platform" NOT NULL,
ADD COLUMN     "precip_method_ext" TEXT,
ADD COLUMN     "projectContact" TEXT NOT NULL,
ADD COLUMN     "projectContactID" TEXT,
ADD COLUMN     "project_id_internal" TEXT,
ADD COLUMN     "recordedByID" TEXT,
ADD COLUMN     "rightsHolder" TEXT,
ADD COLUMN     "seq_facility" TEXT,
ADD COLUMN     "seq_kit" TEXT,
ADD COLUMN     "uploadedBy" TEXT NOT NULL,
DROP COLUMN "recordedBy",
ADD COLUMN     "recordedBy" TEXT[],
DROP COLUMN "grant_number",
ADD COLUMN     "grant_number" INTEGER;

-- AlterTable
ALTER TABLE "Taxonomy" DROP COLUMN "level0",
DROP COLUMN "level1",
DROP COLUMN "level2",
DROP COLUMN "level3",
DROP COLUMN "level4",
DROP COLUMN "level5",
DROP COLUMN "level6",
DROP COLUMN "level7",
DROP COLUMN "level8",
DROP COLUMN "level9",
ADD COLUMN     "class" TEXT,
ADD COLUMN     "division" TEXT,
ADD COLUMN     "domain" TEXT,
ADD COLUMN     "family" TEXT,
ADD COLUMN     "genus" TEXT,
ADD COLUMN     "kingdom" TEXT,
ADD COLUMN     "order" TEXT,
ADD COLUMN     "phylum" TEXT,
ADD COLUMN     "species" TEXT,
ADD COLUMN     "subdivison" TEXT,
ADD COLUMN     "supergroup" TEXT;

-- AlterTable
ALTER TABLE "Water_Sample_Data" DROP COLUMN "alkalinity",
DROP COLUMN "alkalinity_method",
DROP COLUMN "alkyl_diethers",
DROP COLUMN "altitude",
DROP COLUMN "aminopept_act",
DROP COLUMN "ammonium",
DROP COLUMN "atmospheric_data",
DROP COLUMN "bac_prod",
DROP COLUMN "bac_resp",
DROP COLUMN "bacteria_carb_prod",
DROP COLUMN "basisOfRecord",
DROP COLUMN "biomass",
DROP COLUMN "bishomohopanol",
DROP COLUMN "bromide",
DROP COLUMN "calcium",
DROP COLUMN "carb_nitro_ratio",
DROP COLUMN "chem_administration",
DROP COLUMN "chloride",
DROP COLUMN "chlorophyll",
DROP COLUMN "collection_date",
DROP COLUMN "collection_date_local",
DROP COLUMN "concentrationUnit",
DROP COLUMN "conduc",
DROP COLUMN "countryCode",
DROP COLUMN "density",
DROP COLUMN "depth",
DROP COLUMN "diether_lipids",
DROP COLUMN "diss_carb_dioxide",
DROP COLUMN "diss_hydrogen",
DROP COLUMN "diss_inorg_carb",
DROP COLUMN "diss_inorg_nitro",
DROP COLUMN "diss_inorg_phosp",
DROP COLUMN "diss_org_carb",
DROP COLUMN "diss_org_nitro",
DROP COLUMN "diss_oxygen",
DROP COLUMN "dna_conc",
DROP COLUMN "down_par",
DROP COLUMN "elev",
DROP COLUMN "fluor",
DROP COLUMN "geodeticDatum",
DROP COLUMN "glucosidase_act",
DROP COLUMN "isolation_source",
DROP COLUMN "lat_lon",
DROP COLUMN "light_intensity",
DROP COLUMN "magnesium",
DROP COLUMN "mean_frict_vel",
DROP COLUMN "mean_peak_frict_vel",
DROP COLUMN "misc_param",
DROP COLUMN "modified_by",
DROP COLUMN "n_alkanes",
DROP COLUMN "neg_cont_type",
DROP COLUMN "nitrate",
DROP COLUMN "nitrite",
DROP COLUMN "nitro",
DROP COLUMN "omics_observ_id",
DROP COLUMN "org_carb",
DROP COLUMN "org_matter",
DROP COLUMN "org_nitro",
DROP COLUMN "organism_count",
DROP COLUMN "oxy_stat_samp",
DROP COLUMN "part_org_carb",
DROP COLUMN "part_org_nitro",
DROP COLUMN "perturbation",
DROP COLUMN "petroleum_hydrocarb",
DROP COLUMN "ph",
DROP COLUMN "phaeopigments",
DROP COLUMN "phosphate",
DROP COLUMN "phosplipid_fatt_acid",
DROP COLUMN "photon_flux",
DROP COLUMN "pos_cont_type",
DROP COLUMN "potassium",
DROP COLUMN "pressure",
DROP COLUMN "primary_prod",
DROP COLUMN "project_id",
DROP COLUMN "redox_potential",
DROP COLUMN "rel_to_oxygen",
DROP COLUMN "salinity",
DROP COLUMN "silicate",
DROP COLUMN "size_frac_low",
DROP COLUMN "size_frac_up",
DROP COLUMN "sodium",
DROP COLUMN "soluble_react_phosp",
DROP COLUMN "source_mat_id",
DROP COLUMN "sulfate",
DROP COLUMN "sulfide",
DROP COLUMN "suspend_part_matter",
DROP COLUMN "temp",
DROP COLUMN "tidal_stage",
DROP COLUMN "tot_depth_water_col",
DROP COLUMN "tot_diss_nitro",
DROP COLUMN "tot_inorg_nitro",
DROP COLUMN "tot_nitro",
DROP COLUMN "tot_part_carb",
DROP COLUMN "tot_phosp",
DROP COLUMN "turbidity",
DROP COLUMN "water_current",
ADD COLUMN     "Study_DataId" TEXT NOT NULL,
ADD COLUMN     "biosample_accession" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "eventDate" TEXT NOT NULL,
ADD COLUMN     "filter_onsite_dur" TEXT,
ADD COLUMN     "filter_passive_active_0_1" TEXT,
ADD COLUMN     "habitat_natural_artificial_0_1" TEXT,
ADD COLUMN     "samp_size" TEXT,
ADD COLUMN     "samp_size_unit" TEXT,
ADD COLUMN     "samp_store_sol" TEXT,
ADD COLUMN     "samp_vol_ext_unit" TEXT,
ADD COLUMN     "sterilise_method" TEXT,
ADD COLUMN     "uploadedBy" TEXT NOT NULL,
ADD COLUMN     "verbatimEventDate" TEXT;

-- DropTable
DROP TABLE "OtherMetadata";

-- CreateTable
CREATE TABLE "BARCODE_prep_per_library" (
    "id" TEXT NOT NULL,
    "date_modified" TIMESTAMP(3) NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "Water_Sample_DataId" TEXT NOT NULL,
    "sample_name" TEXT NOT NULL,
    "BARCODE_prep_all_librariesId" TEXT NOT NULL,
    "library_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "design_description" TEXT NOT NULL,
    "filetype" "filetype" NOT NULL,
    "filename" TEXT NOT NULL,
    "filename2" TEXT,
    "biosample_accession" TEXT,
    "sra_accession" TEXT,
    "mid_forward" TEXT,
    "mid_reverse" TEXT,
    "pool_dna_0_1" TEXT,
    "pool_dna_num" TEXT,
    "date_dna_extracted" TEXT,
    "extraction_personnel" TEXT,
    "date_pcr" TEXT,
    "pcr_personnel" TEXT,

    CONSTRAINT "BARCODE_prep_per_library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BARCODE_prep_all_libraries" (
    "id" TEXT NOT NULL,
    "date_modified" TIMESTAMP(3) NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "pos_cont_type" TEXT,
    "neg_cont_type" TEXT,
    "nucl_acid_amp" TEXT,
    "pcr_cond" TEXT,
    "annealingTemp" TEXT,
    "amplificationReactionVolume" TEXT,
    "pcr_rep" TEXT,
    "pcr_analysis_software" TEXT,
    "pcr_primer_forward" TEXT,
    "pcr_primer_reverse" TEXT,
    "pcr_primer_name_forward" TEXT,
    "pcr_primer_name_reverse" TEXT,
    "pcr_primer_reference_forward" TEXT,
    "pcr_primer_reference_reverse" TEXT,
    "target_taxa_pcr" TEXT,
    "target_taxa_study" TEXT,
    "target_gene" TEXT,
    "target_subfragment" TEXT,
    "target_gene_size" TEXT,
    "pcr_method_additional" TEXT,
    "sop_bioinformatics" TEXT,
    "code_repo" TEXT,
    "trim_method" TEXT,
    "trim_param" TEXT,
    "demux_tool" TEXT,
    "demux_max_mismatch" TEXT,
    "merge_tool" TEXT,
    "merge_min_overlap" TEXT,
    "min_len_0_1" TEXT,
    "min_len_cutoff" TEXT,
    "min_len_tool" TEXT,
    "min_reads_0_1" TEXT,
    "min_reads_cutoff" TEXT,
    "min_reads_cutoff_unit" TEXT,
    "min_reads_tool" TEXT,
    "error_rate_0_1" TEXT,
    "error_rate_tool" TEXT,
    "error_rate_type" TEXT,
    "error_rate_cutoff" TEXT,
    "chimera_check_0_1" TEXT,
    "chimera_check_method" TEXT,
    "chimera_check_param" TEXT,
    "otu_clust_0_1" TEXT,
    "otu_clust_tool" TEXT,
    "otu_clust_cutoff" TEXT,
    "curation_0_1" TEXT,
    "curation_tool" TEXT,
    "curation_param" TEXT,
    "otu_db" TEXT,
    "otu_db_custom" TEXT,
    "otu_seq_comp_appr" TEXT,
    "tax_class_id_cutoff" TEXT,
    "tax_class_query_cutoff" TEXT,
    "tax_class_collapse" TEXT,
    "tax_class_param_other" TEXT,
    "tax_class" TEXT,
    "screen_contam_0_1" TEXT,
    "screen_contam_method" TEXT,
    "screen_geograph_0_1" TEXT,
    "screen_geograph_method" TEXT,
    "screen_nontarget_0_1" TEXT,
    "screen_nontarget_method" TEXT,
    "screen_other" TEXT,
    "bioinfo_method_additional" TEXT,

    CONSTRAINT "BARCODE_prep_all_libraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metag_Individual_Data" (
    "id" TEXT NOT NULL,
    "date_modified" TIMESTAMP(3) NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "Water_Sample_DataId" TEXT NOT NULL,
    "sample_name" TEXT NOT NULL,
    "library_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "design_description" TEXT NOT NULL,
    "filetype" "filetype" NOT NULL,
    "filename" TEXT NOT NULL,
    "filename2" TEXT,
    "drive_location" TEXT,
    "biosample_accession" TEXT,
    "sra_accession" TEXT,
    "mid_barcode" TEXT,

    CONSTRAINT "Metag_Individual_Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherData" (
    "id" TEXT NOT NULL,
    "SampleMetadataId" TEXT,
    "Water_Sample_DataId" TEXT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "OtherData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BARCODE_prep_per_library_Water_Sample_DataId_sample_name_key" ON "BARCODE_prep_per_library"("Water_Sample_DataId", "sample_name");

-- CreateIndex
CREATE UNIQUE INDEX "Metag_Individual_Data_Water_Sample_DataId_sample_name_key" ON "Metag_Individual_Data"("Water_Sample_DataId", "sample_name");

-- CreateIndex
CREATE UNIQUE INDEX "Amplicon_PrepData_Study_DataId_key" ON "Amplicon_PrepData"("Study_DataId");

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_Data_Study_DataId_key" ON "Analysis_Data"("Study_DataId");

-- CreateIndex
CREATE UNIQUE INDEX "Measurement_Metadata_Study_DataId_key" ON "Measurement_Metadata"("Study_DataId");

-- CreateIndex
CREATE UNIQUE INDEX "Metag_Prep_Data_Study_DataId_key" ON "Metag_Prep_Data"("Study_DataId");

-- CreateIndex
CREATE UNIQUE INDEX "Water_Sample_Data_id_sample_name_key" ON "Water_Sample_Data"("id", "sample_name");

-- AddForeignKey
ALTER TABLE "Water_Sample_Data" ADD CONSTRAINT "Water_Sample_Data_Study_DataId_fkey" FOREIGN KEY ("Study_DataId") REFERENCES "Study_Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BARCODE_prep_per_library" ADD CONSTRAINT "BARCODE_prep_per_library_Water_Sample_DataId_sample_name_fkey" FOREIGN KEY ("Water_Sample_DataId", "sample_name") REFERENCES "Water_Sample_Data"("id", "sample_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BARCODE_prep_per_library" ADD CONSTRAINT "BARCODE_prep_per_library_BARCODE_prep_all_librariesId_fkey" FOREIGN KEY ("BARCODE_prep_all_librariesId") REFERENCES "BARCODE_prep_all_libraries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metag_Individual_Data" ADD CONSTRAINT "Metag_Individual_Data_Water_Sample_DataId_sample_name_fkey" FOREIGN KEY ("Water_Sample_DataId", "sample_name") REFERENCES "Water_Sample_Data"("id", "sample_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Amplicon_PrepData" ADD CONSTRAINT "Amplicon_PrepData_Study_DataId_fkey" FOREIGN KEY ("Study_DataId") REFERENCES "Study_Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metag_Prep_Data" ADD CONSTRAINT "Metag_Prep_Data_Study_DataId_fkey" FOREIGN KEY ("Study_DataId") REFERENCES "Study_Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analysis_Data" ADD CONSTRAINT "Analysis_Data_Study_DataId_fkey" FOREIGN KEY ("Study_DataId") REFERENCES "Study_Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement_Metadata" ADD CONSTRAINT "Measurement_Metadata_Study_DataId_fkey" FOREIGN KEY ("Study_DataId") REFERENCES "Study_Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_TaxonomyId_fkey" FOREIGN KEY ("TaxonomyId") REFERENCES "Taxonomy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_FeatureId_fkey" FOREIGN KEY ("FeatureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_SampleMetadataId_fkey" FOREIGN KEY ("SampleMetadataId") REFERENCES "SampleMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_Study_DataId_fkey" FOREIGN KEY ("Study_DataId") REFERENCES "Study_Data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherData" ADD CONSTRAINT "OtherData_SampleMetadataId_fkey" FOREIGN KEY ("SampleMetadataId") REFERENCES "SampleMetadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherData" ADD CONSTRAINT "OtherData_Water_Sample_DataId_fkey" FOREIGN KEY ("Water_Sample_DataId") REFERENCES "Water_Sample_Data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
