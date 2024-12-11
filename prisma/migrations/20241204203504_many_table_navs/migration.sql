/*
  Warnings:

  - Made the column `project_name` on table `Study` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Study" ALTER COLUMN "project_name" SET NOT NULL;
