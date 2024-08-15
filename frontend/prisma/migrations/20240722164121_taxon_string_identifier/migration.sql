/*
  Warnings:

  - A unique constraint covering the columns `[stringIdentifier]` on the table `Taxonomy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stringIdentifier` to the `Taxonomy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Taxonomy" ADD COLUMN     "stringIdentifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Taxonomy_stringIdentifier_key" ON "Taxonomy"("stringIdentifier");
