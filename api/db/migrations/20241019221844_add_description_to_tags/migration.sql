/*
  Warnings:

  - Added the required column `description` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FamilyMember" ALTER COLUMN "accessRole" SET DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 day';

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "description" TEXT NOT NULL;
