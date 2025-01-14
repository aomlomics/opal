/*
  Warnings:

  - The values [0,1] on the enum `DeadBoolean` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeadBoolean_new" AS ENUM ('false', 'true', 'not applicable', 'not collected', 'not provided', 'missing');
ALTER TABLE "Sample" ALTER COLUMN "habitat_natural_artificial_0_1" TYPE "DeadBoolean_new" USING ("habitat_natural_artificial_0_1"::text::"DeadBoolean_new");
ALTER TABLE "Sample" ALTER COLUMN "filter_passive_active_0_1" TYPE "DeadBoolean_new" USING ("filter_passive_active_0_1"::text::"DeadBoolean_new");
ALTER TABLE "Sample" ALTER COLUMN "dna_cleanup_0_1" TYPE "DeadBoolean_new" USING ("dna_cleanup_0_1"::text::"DeadBoolean_new");
ALTER TABLE "Assay" ALTER COLUMN "pcr_0_1" TYPE "DeadBoolean_new" USING ("pcr_0_1"::text::"DeadBoolean_new");
ALTER TABLE "Analysis" ALTER COLUMN "deblur_sample_stats" TYPE "DeadBoolean_new" USING ("deblur_sample_stats"::text::"DeadBoolean_new");
ALTER TABLE "Analysis" ALTER COLUMN "discard_untrimmed" TYPE "DeadBoolean_new" USING ("discard_untrimmed"::text::"DeadBoolean_new");
ALTER TYPE "DeadBoolean" RENAME TO "DeadBoolean_old";
ALTER TYPE "DeadBoolean_new" RENAME TO "DeadBoolean";
DROP TYPE "DeadBoolean_old";
COMMIT;
