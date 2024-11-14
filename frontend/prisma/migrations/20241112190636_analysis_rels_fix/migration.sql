/*
  Warnings:

  - Added the required column `project_id` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "project_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Study"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;
