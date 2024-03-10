/*
  Warnings:

  - You are about to drop the column `category` on the `Podcast` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Podcast` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Made the column `file` on table `Podcast` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Podcast` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Podcast" DROP CONSTRAINT "Podcast_userId_fkey";

-- AlterTable
ALTER TABLE "Podcast" DROP COLUMN "category",
DROP COLUMN "published",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "file" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Favourites" TEXT[],
ADD COLUMN     "creator" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Podcast" ADD CONSTRAINT "Podcast_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Podcast" ADD CONSTRAINT "Podcast_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
