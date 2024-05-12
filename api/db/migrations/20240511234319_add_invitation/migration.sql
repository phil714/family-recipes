/*
  Warnings:

  - Added the required column `accessRole` to the `FamilyMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyMemberId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccessRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "FamilyMember" ADD COLUMN     "accessRole" "AccessRole" NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "familyMemberId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "accessRole" "AccessRole" NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_familyMemberId_fkey" FOREIGN KEY ("familyMemberId") REFERENCES "FamilyMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
