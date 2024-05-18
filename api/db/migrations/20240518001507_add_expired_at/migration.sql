/*
  Warnings:

  - The required column `code` was added to the `Invitation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '1 day';

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
