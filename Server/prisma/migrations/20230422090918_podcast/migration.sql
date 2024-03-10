/*
  Warnings:

  - You are about to drop the column `title` on the `Podcast` table. All the data in the column will be lost.
  - Added the required column `name` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speaker` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Podcast` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PODCAST_TYPE" AS ENUM ('AUDIO', 'VIDEO');

-- AlterTable
ALTER TABLE "Podcast" DROP COLUMN "title",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "speaker" TEXT NOT NULL,
ADD COLUMN     "type" "PODCAST_TYPE" NOT NULL DEFAULT 'AUDIO',
ALTER COLUMN "description" SET NOT NULL;
