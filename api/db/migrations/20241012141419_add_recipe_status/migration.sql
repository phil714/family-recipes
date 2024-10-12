/*
  Warnings:

  - You are about to drop the column `public` on the `Recipe` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RecipeStatus" AS ENUM ('DRAFT', 'PRIVATE', 'PUBLIC');

-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 day';

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "public",
ADD COLUMN     "status" "RecipeStatus" NOT NULL DEFAULT 'DRAFT';
