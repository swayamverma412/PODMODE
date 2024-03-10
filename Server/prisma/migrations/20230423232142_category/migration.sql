/*
  Warnings:

  - The `type` column on the `Podcast` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Podcast" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'audio';
