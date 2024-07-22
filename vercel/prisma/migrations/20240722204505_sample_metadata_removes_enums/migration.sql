/*
  Warnings:

  - You are about to drop the column `sequid_16s_xxx` on the `SampleMetadata` table. All the data in the column will be lost.
  - The `replicate` column on the `SampleMetadata` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `depth_category` column on the `SampleMetadata` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `sample_collection_device` on the `SampleMetadata` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sample_collection_method` on the `SampleMetadata` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sample_type` on the `SampleMetadata` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `plate` on the `SampleMetadata` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `target_gene` on the `SampleMetadata` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SampleMetadata" DROP COLUMN "sequid_16s_xxx",
ADD COLUMN     "seqid_16s_xxx" TEXT,
DROP COLUMN "replicate",
ADD COLUMN     "replicate" TEXT,
DROP COLUMN "depth_category",
ADD COLUMN     "depth_category" TEXT,
DROP COLUMN "sample_collection_device",
ADD COLUMN     "sample_collection_device" TEXT NOT NULL,
DROP COLUMN "sample_collection_method",
ADD COLUMN     "sample_collection_method" TEXT NOT NULL,
DROP COLUMN "sample_type",
ADD COLUMN     "sample_type" TEXT NOT NULL,
DROP COLUMN "plate",
ADD COLUMN     "plate" TEXT NOT NULL,
DROP COLUMN "target_gene",
ADD COLUMN     "target_gene" TEXT NOT NULL;
