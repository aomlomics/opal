/*
  Warnings:

  - A unique constraint covering the columns `[sample_name]` on the table `SampleMetadata` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SampleMetadata_sample_name_key" ON "SampleMetadata"("sample_name");
