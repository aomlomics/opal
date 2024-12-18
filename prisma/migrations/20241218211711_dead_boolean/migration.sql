/*
  Warnings:

  - The `deblur_sample_stats` column on the `Analysis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `discard_untrimmed` column on the `Analysis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `habitat_natural_artificial_0_1` column on the `Sample` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `filter_passive_active_0_1` column on the `Sample` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dna_cleanup_0_1` column on the `Sample` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `pcr_0_1` on the `Assay` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "deblur_sample_stats",
ADD COLUMN     "deblur_sample_stats" "DeadBoolean",
DROP COLUMN "discard_untrimmed",
ADD COLUMN     "discard_untrimmed" "DeadBoolean";

-- AlterTable
ALTER TABLE "Assay" DROP COLUMN "pcr_0_1",
ADD COLUMN     "pcr_0_1" "DeadBoolean" NOT NULL;

-- AlterTable
ALTER TABLE "Sample" DROP COLUMN "habitat_natural_artificial_0_1",
ADD COLUMN     "habitat_natural_artificial_0_1" "DeadBoolean",
DROP COLUMN "filter_passive_active_0_1",
ADD COLUMN     "filter_passive_active_0_1" "DeadBoolean",
DROP COLUMN "dna_cleanup_0_1",
ADD COLUMN     "dna_cleanup_0_1" "DeadBoolean";
